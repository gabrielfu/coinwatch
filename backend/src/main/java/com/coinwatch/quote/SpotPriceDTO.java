package com.coinwatch.quote;

public record SpotPriceDTO(
        String symbol,
        Double price,
        Double priceChange,
        Double priceChangePercent,
        Long volume,
        Long marketCap,
        Long totalSupply
) {
}
