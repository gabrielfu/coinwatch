package com.coinwatch.clients.coincap;

import com.coinwatch.exceptions.CoinwatchException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@Component
public class CoinCapClient {
    private final RestTemplate restTemplate;

    public CoinCapClient(RestTemplateBuilder builder) {
        restTemplate = builder.build();
    }

    public <T> T getRequest(String url, Class<T> clazz) {
        try {
            return restTemplate.getForObject(url, clazz);
        } catch (HttpStatusCodeException e) {
            throw new CoinwatchException(
                    e.getStatusCode(),
                    "Failed to fetch from CoinCap: " + e.getMessage()
            );
        }
    }

    public CoinCapAssetsResponse getAssets(String token) {
        String url = String.format("https://api.coincap.io/v2/assets?search=%s", token);
        CoinCapAssetsResponse response = getRequest(url, CoinCapAssetsResponse.class);
        List<CoinCapAssetsResponse.AssetData> data = response.getData()
                .stream().filter(r -> Objects.equals(r.getSymbol(), token))
                .toList();
        response.setData(data);
        return response;
    }

    public CoinCapAssetsResponse getAssets(List<String> tokens) {
        String url = "https://api.coincap.io/v2/assets?limit=500";
        CoinCapAssetsResponse response = getRequest(url, CoinCapAssetsResponse.class);
        List<CoinCapAssetsResponse.AssetData> data = response.getData()
                .stream().filter(r -> tokens.contains(r.getSymbol()))
                .toList();
        response.setData(data);
        return response;
    }
}
