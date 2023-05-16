package com.gabrielfu.cryptoportfoliotracker.token;

import com.gabrielfu.cryptoportfoliotracker.token.bootstrap.CoinGeckoClient;
import com.gabrielfu.cryptoportfoliotracker.token.bootstrap.CoinGeckoResponseMapper;
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
                .map(CoinGeckoResponseMapper::asToken)
                .collect(Collectors.toList());
    }
}
