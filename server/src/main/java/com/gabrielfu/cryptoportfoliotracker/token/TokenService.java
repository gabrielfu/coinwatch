package com.gabrielfu.cryptoportfoliotracker.token;

import com.gabrielfu.cryptoportfoliotracker.exceptions.CryptoPortfolioTrackerException;
import com.gabrielfu.cryptoportfoliotracker.exceptions.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TokenService {
    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private TokenBootstrapper tokenBootstrapper;

    public List<Token> getTokens() {
        return tokenRepository.findAll();
    }

    public Token getToken(String symbol) {
        return tokenRepository.findById(symbol)
                .orElseThrow(() -> new CryptoPortfolioTrackerException(
                        ErrorCode.RESOURCE_NOT_FOUND,
                        "Token with symbol '%s' not found".formatted(symbol)
                ));
    }

    public String createToken(Token token) {
        String symbol = token.getSymbol();
        if (symbol == null | Objects.equals(symbol, "")) {
            throw new CryptoPortfolioTrackerException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    "Missing required parameter 'symbol'"
            );
        }
        return tokenRepository.save(token).getSymbol();
    }

    public void updateToken(String symbol, Token newToken) {
        Token token = getToken(symbol);
        if (newToken.getName() != null) {
            token.setName(newToken.getName());
        }
        tokenRepository.save(token);
    }

    public void deleteToken(String symbol) {
        Token token = getToken(symbol);
        tokenRepository.delete(token);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void bootstrapTokens() {
        Set<String> existingSymbols = getTokens()
                .stream().map(Token::getSymbol)
                .collect(Collectors.toSet());
        List<Token> tokens = tokenBootstrapper
                .getTokens()
                .stream().filter(t -> !existingSymbols.contains(t.getSymbol()))
                .toList();
        tokenRepository.saveAll(tokens);
    }
}
