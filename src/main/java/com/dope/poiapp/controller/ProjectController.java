package com.dope.poiapp.controller;

import com.dope.poiapp.domain.dto.request.ProjectRequestDto;
import com.dope.poiapp.domain.dto.response.ProjectResponse;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.service.ProjectService;
import com.dope.poiapp.utils.CRUDResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/project/{id}")
    public ResponseEntity<ProjectResponse> getProject(@PathVariable long id) {
        Project project = projectService.getProject(id);
        if (project == null) {
            return ResponseEntity.badRequest().body(new ProjectResponse(null, CRUDResult.NOT_FOUND.getMessage()));
        }
        return ResponseEntity.ok().body(new ProjectResponse(project, CRUDResult.SUCCESS.getMessage()));
    }

    @PostMapping("/project/create")
    public ResponseEntity<ProjectResponse> createProject(@RequestBody ProjectRequestDto requestDto) {
        ProjectResponse projectResponse = projectService.createProject(requestDto);
        if (projectResponse.project() == null) {
            return ResponseEntity.badRequest().body(new ProjectResponse(null, projectResponse.message()));
        }
        return ResponseEntity.ok().body(projectResponse);
    }

    @PutMapping("/project/update")
    public ResponseEntity<ProjectResponse> updateProject(@RequestBody ProjectRequestDto requestDto) {
        ProjectResponse projectResponse = projectService.updateProject(requestDto);
        if (projectResponse.project() == null) {
            return ResponseEntity.badRequest().body(new ProjectResponse(null, projectResponse.message()));
        }
        return ResponseEntity.ok().body(projectResponse);
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
