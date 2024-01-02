package com.coinwatch.token;

import com.coinwatch.exceptions.CoinwatchException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.MockitoAnnotations.initMocks;

class TokenServiceTest {
    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private TokenService tokenService;

    private final String symbol = "BTC";

    private final Token token = new Token(
            "BTC",
            "Bitcoin",
            "btc.png"
    );

    @BeforeEach
    void setUp() {
        initMocks(this);
    }

    void assertTokenEqual(Token token1, Token token2) {
        assertEquals(token1.getSymbol(), token2.getSymbol());
        assertEquals(token1.getName(), token2.getName());
        assertEquals(token1.getLogo(), token2.getLogo());
    }

    @Test
    void getTokens() {
        given(tokenRepository.findAll())
                .willReturn(List.of(token));
        List<Token> tokens = tokenService.getTokens();
        assertEquals(tokens.size(), 1);
        assertTokenEqual(tokens.get(0), token);
    }

    @Test
    void getToken() {
        given(tokenRepository.findById(symbol))
                .willReturn(java.util.Optional.of(token));
        Token token1 = tokenService.getToken(symbol);
        assertEquals(token1, token);

        given(tokenRepository.findById(symbol))
                .willReturn(java.util.Optional.empty());
        assertThrows(
                CoinwatchException.class,
                () -> tokenService.getToken(symbol),
                "Token with symbol 'BTC' not found"
        );
    }

    @Test
    void createToken() {
        given(tokenRepository.findById(symbol))
                .willReturn(java.util.Optional.of(token));
        assertThrows(
                CoinwatchException.class,
                () -> tokenService.createToken(token),
                "Token with symbol 'BTC' already exists"
        );

        given(tokenRepository.findById(symbol))
                .willReturn(java.util.Optional.empty());
        given(tokenRepository.save(token))
                .willReturn(token);
        assertEquals(tokenService.createToken(token), symbol);

        Token token2 = new Token(
                null,
                "Bitcoin",
                "btc.png"
        );
        assertThrows(
                CoinwatchException.class,
                () -> tokenService.createToken(token2),
                "Missing required parameter 'symbol'"
        );
    }

    @Test
    void updateToken() {
        given(tokenRepository.findById(symbol))
                .willReturn(java.util.Optional.of(token));
        Token token2 = new Token(
                "BTC",
                "NewName",
                "NewLogo"
        );
        tokenService.updateToken(symbol, token2);
        assertTokenEqual(token, token2);
    }

    @Test
    void deleteToken() {
        given(tokenRepository.findById(symbol))
                .willReturn(java.util.Optional.of(token));
        tokenService.deleteToken(symbol);
    }
}