package com.dope.poiapp.controller;

import com.dope.poiapp.domain.dto.CompanyRequestDto;
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
    @PostMapping("/company")
    public void createOrUpdateCompany(@RequestBody CompanyRequestDto requestDto) {
        // TODO: PutMapping 없이 update를 PostMapping으로 처리해도 괜찮을까?
        companyService.saveCompany(requestDto);
    }

    @DeleteMapping("/company")
    public void deleteCompany(@RequestBody CompanyRequestDto requestDto) {
        // TODO: id를 요청으로 받아서 삭제함 -> 굳이 requestDTO를 받을 필요가 있나?
        // companyService.deleteCompany(requestDto.getCompanyId);
    }

    @GetMapping("/company/list")
    public Page<Company> list(@RequestParam(value = "page", defaultValue = "0") int page) {
        return companyService.getAllCompanies(page);
    }

    @GetMapping("/company/{id}/list")
    public Page<Project> listCompanyProjects(@PathVariable long id, @RequestParam(value = "page", defaultValue = "0") int page) {
        return projectService.getCompanyProjects(id, page);
    }

}
