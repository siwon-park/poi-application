package com.dope.poiapp.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CompanyRequestDto {
    String companyName;
    String companyAddress;
}
