package com.gabrielfu.cryptoportfoliotracker.quote;

public record QuoteDTO(
        String symbol,
        Double marketPrice,
        Double marketChange,
        Double marketChangePercent
) {
}
