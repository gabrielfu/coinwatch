package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceChartResponse;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class YahooQuoteServiceImpl implements QuoteService {
    private final YahooFinanceClient yahooFinanceClient;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        String ticker = YahooFinanceClient.getTickerFromToken(token);
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote(ticker);
        return YahooDTOMapper.asSpotPriceDTOs(response).get(0);
    }

    @Override
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        List<String> tickers = tokens.stream()
                        .map(YahooFinanceClient::getTickerFromToken)
                        .toList();
        String ticker = String.join(",", tickers);
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote(ticker);
        List<SpotPriceDTO> dtos = YahooDTOMapper.asSpotPriceDTOs(response);
        Map<String, SpotPriceDTO> dtoMap = dtos.stream().collect(Collectors.toMap(SpotPriceDTO::symbol, item -> item));
        return tokens.stream().map(t -> dtoMap.getOrDefault(t, null)).toList();
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token) {
        return getTokenHistoricalPrices(token, null, null);
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token, String interval, String range) {
        String ticker = YahooFinanceClient.getTickerFromToken(token);
        YahooFinanceChartResponse response = yahooFinanceClient.getChart(ticker, interval, range);
        return YahooDTOMapper.asHistoricalPricesDTO(response);
    }
}
