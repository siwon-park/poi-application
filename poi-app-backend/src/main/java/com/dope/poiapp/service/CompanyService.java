package com.dope.poiapp.service;

import com.dope.poiapp.domain.dto.request.CompanyRequestDto;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.repository.CompanyRepository;
import com.dope.poiapp.utils.CompanyResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public String createCompany(CompanyRequestDto requestDto) {
        Company company = companyRepository.findByName(requestDto.getCompanyName()).orElse(null);
        if (company == null) {
            company = Company.builder()
                    .name(requestDto.getCompanyName())
                    .address(requestDto.getCompanyAddress())
                    .isActive(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .aliasNames(requestDto.getAliasNames())
                    .build();
            companyRepository.save(company);
            return CompanyResult.CREATE_SUCCESS.getMessage();
        } else { // 회사가 있으면 생성 실패 -> already exists
            return CompanyResult.ALREADY_EXIST.getMessage();
        }
    }
    
    // TODO: updateCompany 만들어야 함

    public void deleteCompany(long companyId) {
        Company company = companyRepository.findById(companyId).orElse(null);
        if (company != null) {
            company.updateActive(false);
            companyRepository.save(company);
        }
    }

    public Company getCompany(long companyId) {
        return companyRepository.findById(companyId).orElse(null);
    }

    public Company getCompany(String companyName) {
        return companyRepository.findByName(companyName).orElse(null);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Page<Company> getAllCompanies(int page, String search) {
        Pageable pageable = PageRequest.of(page, 10); // 한 페이지에 20개
        if (search != null && !search.trim().isEmpty()) { // 검색어가 있는 경우
            return companyRepository.findByNameContainingOrAddressContaining(search, search, pageable);
        }
        // 검색어가 없는 경우
        return companyRepository.findAll(pageable);
    }

}
