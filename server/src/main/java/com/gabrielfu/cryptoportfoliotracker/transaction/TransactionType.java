package com.gabrielfu.cryptoportfoliotracker.transaction;

import com.gabrielfu.cryptoportfoliotracker.exceptions.CryptoPortfolioTrackerException;
import com.gabrielfu.cryptoportfoliotracker.exceptions.ErrorCode;

import java.util.Arrays;

public enum TransactionType {
    BUY,
    SELL;

    public static TransactionType fromString(String name) {
        try {
            return TransactionType.valueOf(name);
        }
        catch (IllegalArgumentException e) {
            throw new CryptoPortfolioTrackerException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    "Invalid TransactionType '%s'. Must be one of %s".formatted(
                            name,
                            Arrays.stream(TransactionType.values()).map(Enum::name).toList()
                    )
            );
        }
    }
}
