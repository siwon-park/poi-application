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

    @PostMapping("/company/create")
    public ResponseEntity<String> createCompany(@RequestBody CompanyRequestDto requestDto) {
        System.out.println(requestDto.toString());
        String result = companyService.createCompany(requestDto);
        // TODO: 무조건 OK를 뱉는 건 아닌듯...
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/company/update/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable long id, @RequestBody CompanyRequestDto requestDto) {
        Company company = companyService.updateCompany(id, requestDto);
        return ResponseEntity.ok(company);
    }

    @DeleteMapping("/company/{id}")
    public void deleteCompany(@PathVariable long id) {
         companyService.deleteCompany(id);
    }

    @GetMapping("/company/list")
    public Page<Company> list(@RequestParam(value = "page", defaultValue = "0") int page,
                              @RequestParam(value = "search", required = false) String searchQuery) {
        return companyService.getAllCompanies(page, searchQuery);
    }

    @GetMapping("/company/{id}/list")
    public Page<Project> listCompanyProjects(@PathVariable long id, @RequestParam(value = "page", defaultValue = "0") int page) {
        return projectService.getCompanyProjects(id, page);
    }

    // TODO: 회사명 검색해서 회사 리스트 가져오는 메서드 구현 필요

}
