package com.coinwatch.token;

import com.coinwatch.clients.coingecko.CoinGeckoCoinsMarketsResponse;
import org.springframework.stereotype.Component;

@Component
public class CoinGeckoCoinsMarketsResponseMapper {
    public static Token asToken(CoinGeckoCoinsMarketsResponse response) {
        return new Token(
                response.getSymbol().toUpperCase(),
                response.getName(),
                response.getImage()
        );
    }
}
