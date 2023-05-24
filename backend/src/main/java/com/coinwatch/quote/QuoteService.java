package com.coinwatch.quote;

import java.util.List;

public interface QuoteService {
    public SpotPriceDTO getTokenSpotPrice(String token);
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens);

    public HistoricalPricesDTO getTokenHistoricalPrices(String token);

    public HistoricalPricesDTO getTokenHistoricalPrices(String token, String interval, String range);
}

