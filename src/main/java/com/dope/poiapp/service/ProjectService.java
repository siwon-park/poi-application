package com.dope.poiapp.service;

import com.dope.poiapp.domain.dto.request.ProjectRequestDto;
import com.dope.poiapp.domain.dto.response.ProjectResponse;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.repository.CompanyRepository;
import com.dope.poiapp.repository.ProjectRepository;
import com.dope.poiapp.utils.CRUDResult;
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

    public ProjectResponse createProject(ProjectRequestDto requestDto) {
        Company company = companyRepository.findByName(requestDto.getCompanyName()).orElse(null);
        if (company == null) {
            return new ProjectResponse(null, "Company not found");
        }
        // 신규 프로젝트
        Project project = Project.builder()
                .name(requestDto.getName())
                .projectManager(requestDto.getPM())
                .company(company)
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .build();
        projectRepository.save(project);
        return new ProjectResponse(project, CRUDResult.CREATE_SUCCESS.getMessage());
    }

    public ProjectResponse updateProject(ProjectRequestDto requestDto) {
        Project project = projectRepository.findById(requestDto.getId()).orElse(null);
        if (project == null) { // 프로젝트가 없으므로 수정 못함
            return new ProjectResponse(null, "Project not found");
        }
        Company company = companyRepository.findByName(requestDto.getCompanyName()).orElse(null);
        if (company == null) { // 회사가 없으므로 수정 못함
            return new ProjectResponse(null, "Company not found");
        }
        project.updateName(requestDto.getName());
        project.updateProjectManager(requestDto.getPM());
        project.updateDescription(requestDto.getDescription());
        project.updateCompany(company);
        project.updateCustomer(requestDto.getCustomer());
        project.updateStartDate(requestDto.getStartDate());
        project.updateEndDate(requestDto.getEndDate());
        projectRepository.save(project);
        return new ProjectResponse(project, CRUDResult.UPDATE_SUCCESS.getMessage());
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
