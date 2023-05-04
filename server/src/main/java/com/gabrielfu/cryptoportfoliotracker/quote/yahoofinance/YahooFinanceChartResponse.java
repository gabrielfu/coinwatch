package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class YahooFinanceChartResponse {

    @JsonProperty("chart")
    private Chart chart;

    @Data
    public static class Chart {
        @JsonProperty("result")
        private List<Result> result;

        @JsonProperty("error")
        private Object error;
    }

    @Data
    public static class Result {
        @JsonProperty("meta")
        private Meta meta;

        @JsonProperty("timestamp")
        private List<Long> timestamp;

        @JsonProperty("indicators")
        private Indicators indicators;
    }

    @Data
    public static class Indicators {
        @JsonProperty("quote")
        private List<Quote> quote;
    }

    @Data
    public static class Quote {
        @JsonProperty("open")
        private List<Double> open;

        @JsonProperty("high")
        private List<Double> high;

        @JsonProperty("low")
        private List<Double> low;

        @JsonProperty("close")
        private List<Double> close;

        @JsonProperty("volume")
        private List<Long> volume;

        // Add more properties as needed
    }

    @Data
    public static class Meta {
        @JsonProperty("symbol")
        private String symbol;

        @JsonProperty("currency")
        private String currency;

        @JsonProperty("range")
        private String range;

        @JsonProperty("dataGranularity")
        private String dataGranularity;

        @JsonProperty("regularMarketPrice")
        private Double regularMarketPrice;

        @JsonProperty("regularMarketTime")
        private Long regularMarketTime;

        @JsonProperty("chartPreviousClose")
        private Double chartPreviousClose;
    }
}
