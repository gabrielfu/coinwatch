package com.coinwatch.clients.coingecko;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CoinGeckoClient {
    private final RestTemplate restTemplate;
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    public CoinGeckoClient(RestTemplateBuilder builder, ObjectMapper mapper) {
        this.restTemplate = builder.build();
        this.mapper = mapper;
    }

    public List<CoinGeckoCoinsMarketsResponse> getTokens() {
        ResponseEntity<Object[]> responseEntity = restTemplate.getForEntity(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
                Object[].class
        );
        Object[] objects = responseEntity.getBody();
        return Arrays.stream(objects)
                .map(object -> mapper.convertValue(object, CoinGeckoCoinsMarketsResponse.class))
                .sorted(Comparator.comparingInt(CoinGeckoCoinsMarketsResponse::getMarketCapRank))
                .collect(Collectors.toList());
    }
}
