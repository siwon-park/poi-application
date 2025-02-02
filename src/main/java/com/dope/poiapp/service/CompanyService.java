package com.dope.poiapp.service;

import com.dope.poiapp.domain.dto.CompanyRequestDto;
import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Transactional
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

    }

    public Company getCompany(String companyName) {
        return companyRepository.findByName(companyName).orElse(null);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /*
    * TODO:
    *  1) 회사명으로 검색했을 때 페이지네이션
    *  2) 기본 회사 정보들 페이지네이션
    * */



}
