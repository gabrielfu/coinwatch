package com.gabrielfu.cryptoportfoliotracker.quote;

import java.util.List;

public interface QuoteService {
    public SpotPriceDTO getTokenSpotPrice(String token);

    public HistoricalPricesDTO getTokenHistoricalPrices(String token);
}

