package com.gabrielfu.cryptoportfoliotracker.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class CryptoPortfolioTrackerException extends RuntimeException {
    public CryptoPortfolioTrackerException(Throwable cause) {
        super(cause);
    }

    public CryptoPortfolioTrackerException(ErrorCode errorCode, String reason) {
        this(new ResponseStatusException(errorCode.getHttpStatus(), reason));
    }

    public CryptoPortfolioTrackerException(HttpStatusCode statusCode, String reason) {
        this(new ResponseStatusException(statusCode, reason));
    }
}
