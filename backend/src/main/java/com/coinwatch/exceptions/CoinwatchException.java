package com.coinwatch.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class CoinwatchException extends RuntimeException {
    public CoinwatchException(Throwable cause) {
        super(cause);
    }

    public CoinwatchException(ErrorCode errorCode, String reason) {
        this(new ResponseStatusException(errorCode.getHttpStatus(), reason));
    }

    public CoinwatchException(HttpStatusCode statusCode, String reason) {
        this(new ResponseStatusException(statusCode, reason));
    }
}
