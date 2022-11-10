package com.oshan.webfluxdemo.controller;

import com.oshan.webfluxdemo.model.AgentInfoDTO;
import com.oshan.webfluxdemo.model.RealTimePerfDTO;
import com.oshan.webfluxdemo.service.ResourceService;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import reactor.util.function.Tuple2;

@RestController
public class ResourceController {

    @Autowired
    ResourceService resourceService;

    @CrossOrigin(allowedHeaders = "*")
    @GetMapping(value = "/event/realtime/data", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<RealTimePerfDTO>> getRealTimeData() {

        Flux<Long> intervalToGenerateUsage = Flux.interval(Duration.ofSeconds(1));

        Flux<List<RealTimePerfDTO>> usageFlux = Flux.fromStream(Stream.generate(() -> resourceService.getReslTimeData()));

        return Flux.zip(intervalToGenerateUsage, usageFlux).map(Tuple2::getT2);

    }

    @CrossOrigin(allowedHeaders = "*")
    @GetMapping(value = "/event/agentinfo/data", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<AgentInfoDTO>> getAgentInfoData() {

        Flux<Long> intervalToGenerateUsage = Flux.interval(Duration.ofSeconds(1));

        Flux<List<AgentInfoDTO>> usageTsFlux = Flux.fromStream(Stream.generate(() -> resourceService.getAgentInfoData()));

        return Flux.zip(intervalToGenerateUsage, usageTsFlux).map(Tuple2::getT2);

    }

}
