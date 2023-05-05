package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceChartResponse;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import org.springframework.web.client.RestTemplate;

public class YahooQuoteServiceImpl implements QuoteService {
    private final YahooFinanceClient yahooFinanceClient;

    public YahooQuoteServiceImpl(YahooFinanceClient yahooFinanceClient) {
        this.yahooFinanceClient = yahooFinanceClient;
    }

    @Override
    public QuoteDTO getTokenQuote(String tokenSymbol) {
        String tickerSymbol = yahooFinanceClient.getTickerFromToken(tokenSymbol);
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote(tickerSymbol);
        YahooFinanceQuoteResponse.Result result = response.getQuoteResponse().getResult().get(0);
        return new QuoteDTO(
                result.getSymbol(),
                result.getRegularMarketPrice(),
                result.getRegularMarketChange(),
                result.getRegularMarketChangePercent()
        );
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String tokenSymbol) {
        String tickerSymbol = yahooFinanceClient.getTickerFromToken(tokenSymbol);
        YahooFinanceChartResponse response = yahooFinanceClient.getChart(tickerSymbol);
        YahooFinanceChartResponse.Result result = response.getChart().getResult().get(0);
        return new HistoricalPricesDTO(
                result.getMeta().getSymbol(),
                result.getTimestamp(),
                result.getIndicators().getQuote().get(0).getClose()
        );
    }
}
