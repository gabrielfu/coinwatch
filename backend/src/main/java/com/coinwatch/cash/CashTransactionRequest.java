package com.coinwatch.cash;

import jakarta.validation.constraints.NotNull;

public record CashTransactionRequest(
        @NotNull Long portfolioId,
        @NotNull String date,
        @NotNull Double quantity,
        @NotNull String type
) {
}

