package com.dope.poiapp.utils;

public enum CompanyResult {

    CREATE_SUCCESS("create success"),
    ALREADY_EXIST("already exist"),;

    private final String message;

    CompanyResult(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
