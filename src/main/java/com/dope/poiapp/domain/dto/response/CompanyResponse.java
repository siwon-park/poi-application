package com.dope.poiapp.domain.dto.response;

import com.dope.poiapp.domain.entity.Project;

import java.time.LocalDateTime;
import java.util.List;

public record CompanyResponse (
        long id,
        String name,
        String address,
        List<String> aliasNames,
        List<Project> projects,
        boolean isActive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
)
{
}
