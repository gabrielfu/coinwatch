package com.coinwatch.quote;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Qualifier("aggregateService")
public class AggregateQuoteServiceImpl implements QuoteService {
    private final YahooQuoteServiceImpl yahooQuoteService;
    private final CoinCapQuoteServiceImpl coinCapQuoteService;

    @Override
    @Cacheable("quoteSpot")
    public SpotPriceDTO getTokenSpotPrice(String token) {
        return coinCapQuoteService.getTokenSpotPrice(token);
    }

    @Override
    @Cacheable("quoteBatchSpot")
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        return coinCapQuoteService.batchGetTokenSpotPrice(tokens);
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token) {
        return getTokenHistoricalPrices(token, null, null);
    }

    @Override
    @Cacheable("quoteHistorical")
    public HistoricalPricesDTO getTokenHistoricalPrices(String token, String interval, String range) {
        return yahooQuoteService.getTokenHistoricalPrices(token, interval, range);
    }

    @Scheduled(fixedRate = 60000L)
    @CacheEvict(cacheNames = {"quoteSpot", "quoteBatchSpot", "quoteHistorical"}, allEntries = true)
    public void clearCache() {}
}
