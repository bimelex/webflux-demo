package com.oshan.webfluxdemo.model;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class Usage {

    private String hostName;

    private int cpuUsage;

    private int memoryUsage;

    private String date;

    private String taskTime;

}
