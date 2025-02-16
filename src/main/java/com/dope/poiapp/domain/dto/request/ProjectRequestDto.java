package com.dope.poiapp.domain.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class ProjectRequestDto {
    private String projectName;
    private String projectManager;
    private String projectDescription;
    private String projectCustomer;
    private String companyName;
    private Date startDate;
    private Date endDate;
}
