package com.oshan.webfluxdemo.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class AgentInfoDTO {

    private Integer agentId;

    private String agentName;

    private Integer connectYn;

    private Integer groupId;

}
