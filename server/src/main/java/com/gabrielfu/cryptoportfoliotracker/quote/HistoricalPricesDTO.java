package com.gabrielfu.cryptoportfoliotracker.quote;

import java.util.List;

public record HistoricalPricesDTO(
        String symbol,
        List<Long> timestamp,
        List<Double> price
) {
}
