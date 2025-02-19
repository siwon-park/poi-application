package com.dope.poiapp.domain.dto.request;

import java.time.LocalDateTime;
import java.util.List;

public record CompanyRequestDto (
    long id,
    String name,
    String address,
    List<String> aliasNames,
    boolean isActive,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
){
}