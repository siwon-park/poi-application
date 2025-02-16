package com.dope.poiapp.service;

import com.dope.poiapp.domain.dto.request.ProjectRequestDto;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.repository.CompanyRepository;
import com.dope.poiapp.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;

    public Project getProject(long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getPMProjects(String pmName) {
        return projectRepository.findByProjectManager(pmName);
    }

    public List<Project> getCompanyProjects(String companyName) {
        return projectRepository.findByCompanyName(companyName);
    }

    public List<Project> getBetweenDate(Date startDate, Date endDate) {
        List<Project> projects = projectRepository.findByStartDateGreaterThanEqualAndEndDateLessThanEqual(startDate, endDate);
        for (Project project : projects) {
            System.out.println(project.toString());
        }
        return projects;
    }

    public void createProject(ProjectRequestDto requestDto) {
        Company company = companyRepository.findByName(requestDto.getCompanyName()).orElse(null);
        if (company == null) {
            // 회사가 없으므로 프로젝트를 등록 못함
            return;
        }
        // 신규 프로젝트
        Project project = Project.builder()
                .name(requestDto.getProjectName())
                .projectManager(requestDto.getProjectManager())
                .company(company)
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .build();
        projectRepository.save(project);
        return;
    }

    // TODO: requestDTO에 id까지 담아서 주는 게 맞을까?
    public void updateProject(long id, ProjectRequestDto requestDto) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project == null) { // 프로젝트가 없으므로 수정 못함
            return;
        }
        Company company = companyRepository.findByName(requestDto.getCompanyName()).orElse(null);
        if (company == null) { // 회사가 없으므로 수정 못함
            return;
        }
        project.updateName(requestDto.getProjectName());
        project.updateProjectManager(requestDto.getProjectManager());
        project.updateDescription(requestDto.getProjectDescription());
        project.updateCompany(company);
        project.updateCustomer(requestDto.getProjectCustomer());
        project.updateStartDate(requestDto.getStartDate());
        project.updateEndDate(requestDto.getEndDate());
        projectRepository.save(project);
        return;
    }

    // 프로젝트는 hard delete
    public void deleteProject(long id) {
        projectRepository.deleteById(id);
        return;
    }

    public Page<Project> getAllProjects(int page) {
        Pageable pageable = PageRequest.of(page, 20);
        return projectRepository.findAll(pageable);
    }

    // 사용자가 회사를 검색하고 프로젝트를 찾음 -> 회사를 문자열로 검색 -> 회사를 찾음 -> 해당 서비스 호출
    public Page<Project> getCompanyProjects(long companyId, int page) {
        Company company = companyRepository.findById(companyId).orElse(null);
        if (company == null) {
            return null;
        }
        Pageable pageable = PageRequest.of(page, 20);
        return projectRepository.findAllByCompanyName(company.getName(), pageable);
    }

}
