package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

import org.springframework.web.client.RestTemplate;
import org.apache.http.client.utils.URIBuilder;

import java.net.URISyntaxException;

public class YahooFinanceClient {
    private final String QUOTE_BASE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
    private final String CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
    private final RestTemplate restTemplate;

    public YahooFinanceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getTickerFromToken(String token) {
        return token + "-USD";
    }

    public YahooFinanceQuoteResponse getQuote(String tickerSymbol) {
        String url = String.format("%s?symbols=%s", QUOTE_BASE_URL, tickerSymbol);
        return restTemplate.getForObject(url, YahooFinanceQuoteResponse.class);
    }

    public YahooFinanceChartResponse getChart(
            String tickerSymbol,
            String interval,
            String range,
            Long period1,
            Long period2
    ) {
        String url;
        try {
            URIBuilder builder = new URIBuilder(String.format("%s/%s", CHART_BASE_URL, tickerSymbol));
            if (interval != null) {
                builder.addParameter("interval", interval);
            }
            if (range != null) {
                builder.addParameter("range", range);
            }
            if (period1 != null) {
                builder.addParameter("period1", period1.toString());
            }
            if (period2 != null) {
                builder.addParameter("period2", period2.toString());
            }
            url = builder.build().toString();
        } catch (URISyntaxException e) {
            throw new RuntimeException(
                    "Failed to make Yahoo Finance Chart URL",
                    e
            );
        }
        return restTemplate.getForObject(url, YahooFinanceChartResponse.class);
    }

    public YahooFinanceChartResponse getChart(String tickerSymbol, String interval, String range) {
        return getChart(tickerSymbol, interval, range, null, null);
    }

    public YahooFinanceChartResponse getChart(String tickerSymbol, Long period1, Long period2) {
        return getChart(tickerSymbol, null, null, period1, period2);
    }

    public YahooFinanceChartResponse getChart(String tickerSymbol) {
        return getChart(tickerSymbol, null, null, null, null);
    }
}
