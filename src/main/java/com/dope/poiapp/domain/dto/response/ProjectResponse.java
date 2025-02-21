package com.dope.poiapp.domain.dto.response;

import com.dope.poiapp.domain.entity.Project;

public record ProjectResponse (
        Project project,
        String message
) {
}
