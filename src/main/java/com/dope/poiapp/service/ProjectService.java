package com.dope.poiapp.service;

import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

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

    /*
    * TODO: 프로젝트는 생성 시 id 값을 알지 못함 -> Company는 이름으로 식별이 가능하긴 함
    * */
    public Project createProject() {
        Project project = null;
        if (project == null) { // 신규 생성

        } else { // 변경
            
        }

        return projectRepository.save(project);
    }
}
