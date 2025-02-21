package com.dope.poiapp.controller;

import com.dope.poiapp.domain.dto.request.CompanyRequestDto;
import com.dope.poiapp.domain.dto.response.CompanyResponse;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.service.CompanyService;
import com.dope.poiapp.service.ProjectService;
import com.dope.poiapp.utils.CRUDResult;
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
        String result = companyService.createCompany(requestDto);
        if ("success".equals(result)) {
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PutMapping("/company/update")
    public ResponseEntity<CompanyResponse> updateCompany(@RequestBody CompanyRequestDto requestDto) {
        CompanyResponse companyResponse = companyService.updateCompany(requestDto);
        if (companyResponse.company() == null) {
            return ResponseEntity.badRequest().body(companyResponse);
        }
        return ResponseEntity.ok().body(companyResponse);
    }

    @DeleteMapping("/company/{id}")
    public ResponseEntity<CompanyResponse> deleteCompany(@PathVariable long id) {
         CompanyResponse companyResponse = companyService.deleteCompany(id);
         if (CRUDResult.DELETE_SUCCESS.equals(companyResponse.message())) {
             return ResponseEntity.ok().body(companyResponse);
         }
         return ResponseEntity.badRequest().body(companyResponse);
    }

    // TODO: ResponseEntity를 사용해서 페이지네이션 처리가 가능한가?
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
