package com.dope.poiapp.controller;

import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ProjectController {

    private final ProjectService projectService;

    // TODO: Project CRUD 구현 필요

    @GetMapping("/project/list/")
    public Page<Project> getProjectList(@RequestParam(value = "page", defaultValue = "0") int page) {
        return projectService.getAllProjects(page);
    }
}
