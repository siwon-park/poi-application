package com.dope.poiapp.domain.dto.response;

import com.dope.poiapp.domain.entity.Project;

import java.util.List;

public record CompanyResponse (long id, String name, String address, List<Project> projects) {
}
