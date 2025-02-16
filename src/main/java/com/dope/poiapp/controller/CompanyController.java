package com.dope.poiapp.controller;

import com.dope.poiapp.domain.dto.request.CompanyRequestDto;
import com.dope.poiapp.domain.dto.response.CompanyResponse;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.service.CompanyService;
import com.dope.poiapp.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CompanyController {

    private final CompanyService companyService;
    private final ProjectService projectService;

    @GetMapping("/company/{id}")
    public ResponseEntity<Company> getCompany(@PathVariable long id) {
        return ResponseEntity.ok().body(companyService.getCompany(id));
    }

    // TODO: 회사의 생성과 업데이트를 명확하게 구분하기
    @PostMapping("/company")
    public void createCompany(@RequestBody CompanyRequestDto requestDto) {
        companyService.saveCompany(requestDto);
    }

    @PutMapping("/company")
    public void updateCompany(@RequestBody CompanyRequestDto requestDto) {
        companyService.saveCompany(requestDto);
    }

    @DeleteMapping("/company/{id}")
    public void deleteCompany(@PathVariable long id) {
         companyService.deleteCompany(id);
    }

    @GetMapping("/company/list")
    public Page<Company> list(@RequestParam(value = "page", defaultValue = "0") int page) {
        return companyService.getAllCompanies(page);
    }

    @GetMapping("/company/{id}/list")
    public Page<Project> listCompanyProjects(@PathVariable long id, @RequestParam(value = "page", defaultValue = "0") int page) {
        return projectService.getCompanyProjects(id, page);
    }

    // TODO: 회사명 검색해서 회사 리스트 가져오는 메서드 구현 필요

}
