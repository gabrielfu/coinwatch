package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.apache.http.client.utils.URIBuilder;

import java.net.URISyntaxException;

@Component
class Rest {
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}

@Component
public class YahooFinanceClient {
    private final String QUOTE_BASE_URL = "https://query1.finance.yahoo.com/v6/finance/quote";
    private final String CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
    private final RestTemplate restTemplate;

    @Autowired
    public YahooFinanceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getTickerFromToken(String token) {
        return token + "-USD";
    }

    public YahooFinanceQuoteResponse getQuote(String ticker) {
        String url = String.format("%s?symbols=%s", QUOTE_BASE_URL, ticker);
        return restTemplate.getForObject(url, YahooFinanceQuoteResponse.class);
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
        return restTemplate.getForObject(url, YahooFinanceChartResponse.class);
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
