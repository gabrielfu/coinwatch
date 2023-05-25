package com.coinwatch.token;

import com.coinwatch.clients.coingecko.CoinGeckoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TokenBootstrapper {
    @Autowired
    private CoinGeckoClient coinGeckoClient;

    public List<Token> getTokens() {
        return coinGeckoClient.getTokens().stream()
                .map(CoinGeckoCoinsMarketsResponseMapper::asToken)
                .collect(Collectors.toList());
    }
}
