package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class YahooFinanceQuoteResponse {
    @JsonProperty("quoteResponse")
    private QuoteResponse quoteResponse;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class QuoteResponse {
        @JsonProperty("result")
        private List<Result> result;

        @JsonProperty("error")
        private Object error;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result {
        @JsonProperty("symbol")
        private String symbol;

        @JsonProperty("shortName")
        private String shortName;

        @JsonProperty("currency")
        private String currency;

        @JsonProperty("fromCurrency")
        private String fromCurrency;

        @JsonProperty("toCurrency")
        private String toCurrency;

        @JsonProperty("regularMarketPrice")
        private Double regularMarketPrice;

        @JsonProperty("regularMarketChange")
        private Double regularMarketChange;

        @JsonProperty("regularMarketChangePercent")
        private Double regularMarketChangePercent;

        @JsonProperty("regularMarketTime")
        private Long regularMarketTime;

        @JsonProperty("regularMarketVolume")
        private Long regularMarketVolume;

        @JsonProperty("lastMarket")
        private String lastMarket;
    }
}
