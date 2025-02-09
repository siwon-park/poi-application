package com.dope.poiapp.controller;

import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.service.CompanyService;
import com.dope.poiapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CompanyController {

    private final CompanyService companyService;
    private final ProjectService projectService;
    
    // TODO: Company CRUD 구현 필요

    @GetMapping("/company/list")
    public Page<Company> list(@RequestParam(value = "page", defaultValue = "0") int page) {
        return companyService.getAllCompanies(page);
    }

    @GetMapping("/company/{id}/list")
    public Page<Project> listCompanyProjects(@PathVariable long id, @RequestParam(value = "page", defaultValue = "0") int page) {
        return projectService.getCompanyProjects(id, page);
    }

}
