package com.oshan.webfluxdemo.controller;

import com.oshan.webfluxdemo.model.Usage;
import com.oshan.webfluxdemo.service.ResourceService;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.Random;
import reactor.util.function.Tuple2;

@RestController
public class ResourceController {


    @Autowired
    ResourceService resourceService;

    @CrossOrigin(allowedHeaders = "*")
    @GetMapping(value = "/event/postgres/usage", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Usage> getPostUsage() {

        Flux<Long> intervalToGenerateUsage = Flux.interval(Duration.ofSeconds(1));

        Flux<Usage> usageFlux = Flux.fromStream(Stream.generate(() -> resourceService.getUsageData()));

        return Flux.zip(intervalToGenerateUsage, usageFlux).map(Tuple2::getT2);

    }

    @CrossOrigin(allowedHeaders = "*")
    @GetMapping(value = "/event/time/usage", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Usage> getTimeScaleUsage() {

        Flux<Long> intervalToGenerateUsage = Flux.interval(Duration.ofSeconds(1));

        Flux<Usage> usageTsFlux = Flux.fromStream(Stream.generate(() -> resourceService.getTsUsageData()));

        return Flux.zip(intervalToGenerateUsage, usageTsFlux).map(Tuple2::getT2);

    }


    @CrossOrigin(allowedHeaders = "*")
    @GetMapping(value = "/event/elastic/usage", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Usage> getElasticUsage() {

        Flux<Long> intervalToGenerateUsage = Flux.interval(Duration.ofSeconds(1));

        Flux<Usage> usageEsFlux = Flux.fromStream(Stream.generate(() -> resourceService.getEsUsageData()));

        return Flux.zip(intervalToGenerateUsage, usageEsFlux).map(Tuple2::getT2);

    }


}
