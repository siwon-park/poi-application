package com.dope.poiapp.service;

import com.dope.poiapp.domain.dto.request.CompanyRequestDto;
import com.dope.poiapp.domain.dto.response.CompanyResponse;
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
        Company company = companyRepository.findByName(requestDto.name()).orElse(null);
        if (company == null) {
            company = Company.builder()
                    .name(requestDto.name())
                    .address(requestDto.address())
                    .isActive(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .aliasNames(List.of(requestDto.name()))
                    .build();
            companyRepository.save(company);
            return CompanyResult.CREATE_SUCCESS.getMessage();
        } else { // 회사가 있으면 생성 실패 -> already exists
            return CompanyResult.ALREADY_EXIST.getMessage();
        }
    }

    public CompanyResponse updateCompany(CompanyRequestDto requestDto) {
        Company company = companyRepository.findById(requestDto.id()).orElse(null);
        if (company != null) {
            company.updateName(requestDto.name());
            company.updateAddress(requestDto.address());
            company.updateActive(true);
            companyRepository.save(company);
            return new CompanyResponse(company, CompanyResult.UPDATE_SUCCESS.getMessage());
        }
        return new CompanyResponse(null, CompanyResult.NOT_FOUND.getMessage());
    }

    public CompanyResponse deleteCompany(long companyId) {
        Company company = companyRepository.findById(companyId).orElse(null);
        if (company != null) {
            company.updateActive(false);
            companyRepository.save(company);
            return new CompanyResponse(company, CompanyResult.DELETE_SUCCESS.getMessage());
        }
        return new CompanyResponse(null, CompanyResult.NOT_FOUND.getMessage());
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

    public Page<Company> getAllCompanies(int page) {
        Pageable pageable = PageRequest.of(page, 20); // 한 페이지에 20개
        return companyRepository.findAll(pageable);
    }


}
