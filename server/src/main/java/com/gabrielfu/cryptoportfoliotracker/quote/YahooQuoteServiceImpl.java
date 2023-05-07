package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceChartResponse;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class YahooQuoteServiceImpl implements QuoteService {
    private final YahooFinanceClient yahooFinanceClient;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        String ticker = yahooFinanceClient.getTickerFromToken(token);
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote(ticker);
        YahooFinanceQuoteResponse.Result result = response.getQuoteResponse().getResult().get(0);
        return new SpotPriceDTO(
                result.getSymbol(),
                result.getRegularMarketPrice(),
                result.getRegularMarketChange(),
                result.getRegularMarketChangePercent()
        );
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token) {
        String ticker = yahooFinanceClient.getTickerFromToken(token);
        YahooFinanceChartResponse response = yahooFinanceClient.getChart(ticker);
        YahooFinanceChartResponse.Result result = response.getChart().getResult().get(0);
        return new HistoricalPricesDTO(
                result.getMeta().getSymbol(),
                result.getTimestamp(),
                result.getIndicators().getQuote().get(0).getClose()
        );
    }
}
