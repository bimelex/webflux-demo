package com.oshan.webfluxdemo.repository;

import java.io.IOException;
import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.metrics.Max;
import org.elasticsearch.search.aggregations.metrics.MaxAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class ElasticRepo {

    @Value("${elastic.host}")
    private String elasticHost;

    @Value("${elastic.port}")
    private Integer elasticPort;

    public SearchResponse searchByOntunetime() throws IOException {

        // max _ontunetime 조회
       SearchRequest sr1 = new SearchRequest("realtimeperf");
       MaxAggregationBuilder aggregationBuilder = AggregationBuilders.max("max_ontunetime").field("_ontunetime");
       SearchSourceBuilder maxOntunetime = new SearchSourceBuilder();
       maxOntunetime.aggregation(aggregationBuilder);
       sr1.source(maxOntunetime);
       Max max = getClient().search(sr1, RequestOptions.DEFAULT).getAggregations().get("max_ontunetime");

        // max _ontunetime 으로 데이터 조회
       SearchRequest sr2 = new SearchRequest("realtimeperf");
       MatchQueryBuilder matchQueryBuilder = new MatchQueryBuilder("_ontunetime", max.getValue());
       SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
       searchSourceBuilder.query(matchQueryBuilder);
       sr2.source(searchSourceBuilder);
       SearchResponse searchResponse = getClient().search(sr2,RequestOptions.DEFAULT);
       return searchResponse;

   }

   public RestHighLevelClient getClient() {
        RestHighLevelClient client = new RestHighLevelClient(
            RestClient.builder(
                new HttpHost(elasticHost, elasticPort,"http")
            )
        );
        return client;
   }

}
