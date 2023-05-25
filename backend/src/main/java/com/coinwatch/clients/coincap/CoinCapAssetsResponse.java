package com.coinwatch.clients.coincap;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoinCapAssetsResponse {
    @JsonProperty("data")
    private List<AssetData> data;

    @JsonProperty("timestamp")
    private long timestamp;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AssetData {
        @JsonProperty("id")
        private String id;

        @JsonProperty("rank")
        private String rank;

        @JsonProperty("symbol")
        private String symbol;

        @JsonProperty("name")
        private String name;

        @JsonProperty("supply")
        private String supply;

        @JsonProperty("maxSupply")
        private String maxSupply;

        @JsonProperty("marketCapUsd")
        private String marketCapUsd;

        @JsonProperty("volumeUsd24Hr")
        private String volumeUsd24Hr;

        @JsonProperty("priceUsd")
        private String priceUsd;

        @JsonProperty("changePercent24Hr")
        private String changePercent24Hr;

        @JsonProperty("vwap24Hr")
        private String vwap24Hr;

        @JsonProperty("explorer")
        private String explorer;
    }
}