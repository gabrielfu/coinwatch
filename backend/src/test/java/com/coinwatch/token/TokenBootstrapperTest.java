package com.coinwatch.token;

import com.coinwatch.clients.coingecko.CoinGeckoClient;
import com.coinwatch.clients.coingecko.CoinGeckoCoinsMarketsResponse;
import com.coinwatch.clients.coingecko.TestUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class TokenBootstrapperTest {
    @Mock
    private CoinGeckoClient coinGeckoClient;

    @InjectMocks
    private TokenBootstrapper tokenBootstrapper;

    private List<CoinGeckoCoinsMarketsResponse> coinGeckoCoinsMarketsResponse;


    @BeforeEach
    void setup() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        coinGeckoCoinsMarketsResponse = objectMapper.readValue(
                TestUtils.getCoinGeckoTokensJson(),
                new TypeReference<>() {}
        );
    }

    @Test
    void getTokens() {
        given(coinGeckoClient.getTokens())
                .willReturn(coinGeckoCoinsMarketsResponse);
        List<Token> tokens = tokenBootstrapper.getTokens();
        assertEquals(tokens.size(), 3);
        assertEquals(tokens.get(0).getSymbol(), "BTC");
    }
}