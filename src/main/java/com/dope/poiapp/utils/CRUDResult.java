package com.dope.poiapp.utils;

import lombok.Getter;

@Getter
public enum CRUDResult {

    SUCCESS("success"),
    CREATE_SUCCESS("create success"),
    UPDATE_SUCCESS("update success"),
    DELETE_SUCCESS("delete success"),
    ALREADY_EXIST("already exist"),
    NOT_FOUND("not found"),
    FAIL("fail");

    private final String message;

    CRUDResult(String message) {
        this.message = message;
    }

}
