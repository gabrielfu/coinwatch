package com.coinwatch.quote;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Qualifier("aggregateService")
public class AggregateQuoteServiceImpl implements QuoteService {
    private final YahooQuoteServiceImpl yahooQuoteService;
    private final CoinCapQuoteServiceImpl coinCapQuoteService;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        return coinCapQuoteService.getTokenSpotPrice(token);
    }

    @Override
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        return coinCapQuoteService.batchGetTokenSpotPrice(tokens);
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token) {
        return yahooQuoteService.getTokenHistoricalPrices(token);
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token, String interval, String range) {
        return yahooQuoteService.getTokenHistoricalPrices(token, interval, range);
    }
}
