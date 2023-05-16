package com.gabrielfu.cryptoportfoliotracker.quote;

public record SpotPriceDTO(
        String symbol,
        Double price,
        Double priceChange,
        Double priceChangePercent
) {
}
