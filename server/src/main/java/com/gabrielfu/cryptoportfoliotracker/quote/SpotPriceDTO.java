package com.gabrielfu.cryptoportfoliotracker.quote;

public record SpotPriceDTO(
        String symbol,
        Double marketPrice,
        Double marketChange,
        Double marketChangePercent
) {
}
