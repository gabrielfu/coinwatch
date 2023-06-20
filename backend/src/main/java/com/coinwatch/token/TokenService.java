package com.coinwatch.token;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
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
                .orElseThrow(() -> new CoinwatchException(
                        ErrorCode.RESOURCE_NOT_FOUND,
                        "Token with symbol '%s' not found".formatted(symbol)
                ));
    }

    public String createToken(Token token) {
        String symbol = token.getSymbol();
        if (tokenRepository.findById(symbol).isPresent()) {
            throw new CoinwatchException(
                    ErrorCode.RESOURCE_ALREADY_EXISTS,
                    "Token with symbol '%s' already exists".formatted(symbol)
            );
        }
        if (symbol == null | Objects.equals(symbol, "")) {
            throw new CoinwatchException(
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
