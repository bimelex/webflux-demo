package com.oshan.webfluxdemo.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ResponseModel<T> {

    private String errors;
    private ResponseCode status;
    T result;

}
