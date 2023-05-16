package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceChartResponse;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class YahooQuoteServiceImpl implements QuoteService {
    private final YahooFinanceClient yahooFinanceClient;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        String ticker = yahooFinanceClient.getTickerFromToken(token);
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote(ticker);
        return YahooSportPriceDTOMapper.asDTOs(response).get(0);
    }

    @Override
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        List<String> tickers = tokens.stream()
                        .map(yahooFinanceClient::getTickerFromToken)
                        .toList();
        String ticker = String.join(",", tickers);
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote(ticker);
        return YahooSportPriceDTOMapper.asDTOs(response);
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
