package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class YahooFinanceClient {
    private final String QUOTE_BASE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
    private final String CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
    private final RestTemplate restTemplate;

    public YahooFinanceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Double getStockPrice(String tickerSymbol) {
        String url = String.format("%s?symbols=%s", QUOTE_BASE_URL, tickerSymbol);
        YahooFinanceQuoteResponse response = restTemplate.getForObject(url, YahooFinanceQuoteResponse.class);
        // Extract stock price from the response
        return response.getQuoteResponse().getResult()[0].getRegularMarketPrice();
    }

    public YahooFinanceChartResponse getChart(String tickerSymbol) {
        String url = String.format("%s/%s", CHART_BASE_URL, tickerSymbol);
        YahooFinanceChartResponse response = restTemplate.getForObject(url, YahooFinanceChartResponse.class);
        return response;
    }

//    public List<Double> getHistoricalStockPrices(String tickerSymbol, LocalDate startDate, LocalDate endDate) {
//        String url = String.format("%ssymbol=%s&period1=%s&period2=%s", HISTORICAL_BASE_URL, tickerSymbol,
//                startDate.atStartOfDay().toEpochSecond(ZoneOffset.UTC),
//                endDate.atStartOfDay().toEpochSecond(ZoneOffset.UTC));
//        YFChartResponse response = restTemplate.getForObject(url, YFChartResponse.class);
//        // Extract closing prices from the response
//        return response.getClosingPrices();
//    }
}


class Main {
    public static void main(String[] args) {
        YahooFinanceClient client = new YahooFinanceClient(new RestTemplate());
        Double price = client.getStockPrice("AVAX-USD");
        System.out.println(price);

        System.out.println(client.getChart("AVAX-USD"));
        System.out.println(client.getChart("AVAX-sss"));
    }
}