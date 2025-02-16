package com.dope.poiapp.controller;

import com.dope.poiapp.domain.dto.request.ProjectRequestDto;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/project/{id}")
    public Project getProject(@PathVariable long id) {
        return projectService.getProject(id);
    }

    @PostMapping("/project/")
    public void createProject(@RequestBody ProjectRequestDto requestDto) {
        projectService.createProject(requestDto);
    }

    @PutMapping("/project/{id}")
    public void updateProject(@PathVariable long id, @RequestBody ProjectRequestDto requestDto) {
        projectService.updateProject(id, requestDto);
    }

    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable long id) {
        projectService.deleteProject(id);
    }

    @GetMapping("/project/list/")
    public Page<Project> getProjectList(@RequestParam(value = "page", defaultValue = "0") int page) {
        return projectService.getAllProjects(page);
    }
}
