package com.coinwatch.tracking;

public record Position(
        Double quantity,
        Double averagePrice,
        Double costBasis,
        Double marketPrice,
        Double marketValue,
        Double change,
        Double changePercent
) {
}
