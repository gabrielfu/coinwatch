package com.coinwatch.clients.coingecko;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoinGeckoCoinsMarketsResponse {
    @JsonProperty("symbol")
    private String symbol;

    @JsonProperty("name")
    private String name;

    @JsonProperty("image")
    private String image;

    @JsonProperty("current_price")
    private Double price;

    @JsonProperty("price_change_24h")
    private Double priceChange;

    @JsonProperty("price_change_percentage_24h")
    private Double priceChangePercent;

    @JsonProperty("total_volume")
    private Long volume;

    @JsonProperty("market_cap")
    private Long marketCap;

    @JsonProperty("market_cap_rank")
    private Integer marketCapRank;

    @JsonProperty("total_supply")
    private Double totalSupply;
}