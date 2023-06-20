package com.coinwatch.cash;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;

import java.util.Arrays;

public enum CashTransactionType {
    DEPOSIT,
    WITHDRAWAL;

    public static CashTransactionType fromString(String name) {
        try {
            return CashTransactionType.valueOf(name);
        }
        catch (IllegalArgumentException e) {
            throw new CoinwatchException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    "Invalid CashTransactionType '%s'. Must be one of %s".formatted(
                            name,
                            Arrays.stream(CashTransactionType.values()).map(Enum::name).toList()
                    )
            );
        }
    }
}

