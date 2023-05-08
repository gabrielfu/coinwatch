package com.gabrielfu.cryptoportfoliotracker.exceptions;

import org.springframework.web.server.ResponseStatusException;

public class CryptoPortfolioTrackerException extends RuntimeException {
    public CryptoPortfolioTrackerException(Throwable cause) {
        super(cause);
    }

    public CryptoPortfolioTrackerException(ErrorCode errorCode, String reason) {
        this(new ResponseStatusException(errorCode.getHttpStatus(), reason));
    }
}
