package com.coinwatch.token.bootstrap;

import com.coinwatch.token.Token;
import org.springframework.stereotype.Component;

@Component
public class CoinGeckoResponseMapper {
    public static Token asToken(CoinGeckoResponse response) {
        return new Token(
                response.getSymbol().toUpperCase(),
                response.getName(),
                response.getImage(),
                null
        );
    }
}
