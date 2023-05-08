package com.gabrielfu.cryptoportfoliotracker.tracking;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrackingPortfolioResponse {
    @JsonProperty("result")
    private Result result;

    @JsonProperty("error")
    private Object error;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result {
        @JsonProperty("portfolioId")
        private Long portfolioId;

        @JsonProperty("portfolioName")
        private String portfolioName;

        @JsonProperty("positions")
        private List<Position> positions;
    }

    public static class Position {
        private String tradeDate;
        private Double quantity;
        private Double purchasePrice;
    }

}

