package com.oshan.webfluxdemo.service;

import com.oshan.webfluxdemo.mapper.UsageMapper;
import com.oshan.webfluxdemo.model.AgentInfoDTO;
import com.oshan.webfluxdemo.model.RealTimePerfDTO;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ResourceService {

    @Autowired
    private UsageMapper usageMapper;


    /**
     * RealTimeData 조회
     * @return
     */
    public List<RealTimePerfDTO> getReslTimeData() {

        return usageMapper.getRealTimeData();
    }

    /**
     * AgentInfo 조회
     * @return
     */
    public List<AgentInfoDTO> getAgentInfoData() {

        return usageMapper.getAgentInfoData();
    }


}
