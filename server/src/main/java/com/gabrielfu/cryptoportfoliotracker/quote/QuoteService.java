package com.gabrielfu.cryptoportfoliotracker.quote;

import java.util.List;

public interface QuoteService {
    public QuoteDTO getTokenQuote(String tokenSymbol);

    public HistoricalPricesDTO getTokenHistoricalPrices(String tokenSymbol);
}

