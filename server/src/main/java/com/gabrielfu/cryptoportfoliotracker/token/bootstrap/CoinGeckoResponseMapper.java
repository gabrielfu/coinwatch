package com.gabrielfu.cryptoportfoliotracker.token.bootstrap;

import com.gabrielfu.cryptoportfoliotracker.token.Token;
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
