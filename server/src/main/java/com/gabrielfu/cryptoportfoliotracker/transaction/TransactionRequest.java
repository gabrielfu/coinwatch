package com.gabrielfu.cryptoportfoliotracker.transaction;

import jakarta.validation.constraints.NotNull;

public record TransactionRequest(
        @NotNull Long portfolioId,
        @NotNull String tokenSymbol,
        @NotNull String date,
        @NotNull Double quantity,
        @NotNull Double purchasePrice,
        @NotNull String type
) {
}
