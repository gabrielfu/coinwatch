package com.coinwatch.tracking;

import java.time.LocalDate;
import java.util.List;

public record TrackingPortfolioDTO(
        Long portfolioId,
        String portfolioName,
        List<Position> positions
) {
    record Position(
            LocalDate transactionDate,

            Double quantity,
            Double purchasePrice
    ) {
    }
}