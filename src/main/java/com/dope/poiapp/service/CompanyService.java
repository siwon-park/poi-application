package com.dope.poiapp.service;

import com.dope.poiapp.domain.dto.request.CompanyRequestDto;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public void saveCompany(CompanyRequestDto requestDto) {
        Company company = companyRepository.findByName(requestDto.getCompanyName()).orElse(null);
        if (company == null) {
            company = Company.builder()
                    .name(requestDto.getCompanyName())
                    .address(requestDto.getCompanyAddress())
                    .isActive(true)
                    .build();
        } else {
            company.updateName(requestDto.getCompanyName());
            company.updateAddress(requestDto.getCompanyAddress());
            company.updateActive(true);
        }
        companyRepository.save(company);
    }

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

    public Page<Company> getAllCompanies(int page) {
        Pageable pageable = PageRequest.of(page, 20); // 한 페이지에 20개
        return companyRepository.findAll(pageable);
    }


}
