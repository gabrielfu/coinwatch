package com.coinwatch.clients.yahoofinance;

import com.coinwatch.exceptions.CoinwatchException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.apache.http.client.utils.URIBuilder;

import java.net.URISyntaxException;

@Component
public class YahooFinanceClient {
    private final String QUOTE_BASE_URL = "https://query1.finance.yahoo.com/v6/finance/quote";
    private final String CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
    private final RestTemplate restTemplate;

    public YahooFinanceClient(RestTemplateBuilder builder) {
        restTemplate = builder.build();
    }

    public static String getTickerFromToken(String token) {
        return token + "-USD";
    }

    public static String getTokenFromTicker(String ticker) {
        return ticker.replace("-USD", "");
    }

    public <T> T getRequest(String url, Class<T> clazz) {
        try {
            return restTemplate.getForObject(url, clazz);
        } catch (HttpStatusCodeException e) {
            throw new CoinwatchException(
                    e.getStatusCode(),
                    "Failed to fetch from Yahoo Finance: " + e.getMessage()
            );
        }
    }

    public YahooFinanceQuoteResponse getQuote(String ticker) {
        String url = String.format("%s?symbols=%s", QUOTE_BASE_URL, ticker);
        return getRequest(url, YahooFinanceQuoteResponse.class);
    }

    public YahooFinanceChartResponse getChart(
            String ticker,
            String interval,
            String range,
            Long period1,
            Long period2
    ) {
        String url;
        try {
            URIBuilder builder = new URIBuilder(String.format("%s/%s", CHART_BASE_URL, ticker));
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
        return getRequest(url, YahooFinanceChartResponse.class);
    }

    public YahooFinanceChartResponse getChart(String ticker, String interval, String range) {
        return getChart(ticker, interval, range, null, null);
    }

    public YahooFinanceChartResponse getChart(String ticker, Long period1, Long period2) {
        return getChart(ticker, null, null, period1, period2);
    }

    public YahooFinanceChartResponse getChart(String ticker) {
        return getChart(ticker, null, null, null, null);
    }
}
