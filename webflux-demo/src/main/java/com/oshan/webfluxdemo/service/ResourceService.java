package com.oshan.webfluxdemo.service;

import com.oshan.webfluxdemo.mapper.UsageMapper;
import com.oshan.webfluxdemo.model.Usage;
import com.oshan.webfluxdemo.repository.ElasticRepo;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.StopWatch;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ResourceService {

    @Autowired
    private UsageMapper usageMapper;

    @Autowired
    private ElasticRepo elasticRepo;

    /**
     * PostgreSql 조회
     * @return
     */
    public Usage getUsageData() {

        StopWatch sw = new StopWatch();
        sw.start();
        List<Usage> list = usageMapper.getUsageData();
        sw.stop();

        return Usage.builder()
            .cpuUsage(list.get(0).getCpuUsage())
            .memoryUsage(list.get(0).getMemoryUsage())
            .date(list.get(0).getDate())
            .taskTime(sw.totalTime().toString())
            .build();
    }

    /**
     * TimeScaleDB(hyper table) 조회
     * @return
     */
    public Usage getTsUsageData() {

        StopWatch sw = new StopWatch();
        sw.start();
        List<Usage> list = usageMapper.getUsageTsData();
        sw.stop();

        return Usage.builder()
            .cpuUsage(list.get(0).getCpuUsage())
            .memoryUsage(list.get(0).getMemoryUsage())
            .date(list.get(0).getDate())
            .taskTime(sw.totalTime().toString())
            .build();
    }

    /**
     * ElasticSearch RealtimePerf 조회
     * @return
     */
    public Usage getEsUsageData() {

        try {
            StopWatch sw = new StopWatch();
            sw.start();

            SearchResponse response = elasticRepo.searchByOntunetime();

            List<Map<String,Object>> list = new ArrayList<>();

            SearchHits searchHits = response.getHits();
            for(SearchHit hit : searchHits) {
                Map<String, Object> sourceMap = hit.getSourceAsMap();
                list.add(sourceMap);
            }

            int cpuUsage =  ((int) list.get(0).get("_user") +(int)list.get(0).get("_sys"));
            int memoryUsed = Math.round((int)list.get(0).get("_memoryused")/100);
            Date ontunetime = Timestamp.from(Instant.ofEpochSecond((int) list.get(0).get("_ontunetime")));
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd a HH:mm:ss");
            sw.stop();

            return Usage.builder()
                .cpuUsage(cpuUsage)
                .memoryUsage(memoryUsed)
                .date(simpleDateFormat.format(ontunetime))
                .taskTime(sw.totalTime().toString())
                .build();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

}
