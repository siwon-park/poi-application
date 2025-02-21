package com.dope.poiapp.domain.dto.response;

import com.dope.poiapp.domain.entity.Company;
import com.dope.poiapp.domain.entity.Project;

import java.time.LocalDateTime;
import java.util.List;

public record CompanyResponse (
        Company company,
        String message
)
{
}
