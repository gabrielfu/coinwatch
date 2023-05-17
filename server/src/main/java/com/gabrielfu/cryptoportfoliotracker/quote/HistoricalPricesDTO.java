package com.gabrielfu.cryptoportfoliotracker.quote;

import java.util.List;

public record HistoricalPricesDTO(
        String symbol,
        List<Series> series
) {
    public record Series(
            Long time,
            Double open,
            Double high,
            Double low,
            Double close,
            Long volume
    ) {
    }
}
