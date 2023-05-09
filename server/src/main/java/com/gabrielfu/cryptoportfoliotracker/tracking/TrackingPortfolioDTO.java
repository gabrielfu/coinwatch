package com.gabrielfu.cryptoportfoliotracker.tracking;

import java.util.List;

public record TrackingPortfolioDTO(
        Long portfolioId,
        String portfolioName,
        List<Position> positions
) {
    record Position(
            String tradeDate,

            Double quantity,
            Double purchasePrice
    ) {
    }
}