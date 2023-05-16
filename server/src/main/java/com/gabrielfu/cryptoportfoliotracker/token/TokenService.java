package com.gabrielfu.cryptoportfoliotracker.token;

import com.gabrielfu.cryptoportfoliotracker.exceptions.CryptoPortfolioTrackerException;
import com.gabrielfu.cryptoportfoliotracker.exceptions.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

@Service
public class TokenService {
    @Autowired
    private TokenRepository tokenRepository;

    public List<Token> getTokens() {
        return tokenRepository.findAll();
    }

    public Token getTokenById(Long id) {
        return tokenRepository.findById(id)
                .orElseThrow(() -> new CryptoPortfolioTrackerException(
                        ErrorCode.RESOURCE_NOT_FOUND,
                        "Token with id '%s' not found".formatted(id)
                ));
    }

    public Optional<Token> getTokenBySymbol(String symbol) {
        Token probe = new Token();
        probe.setSymbol(symbol);
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("symbol", ignoreCase());
        Example<Token> example = Example.of(probe, modelMatcher);
        return tokenRepository.findBy(
                example,
                FluentQuery.FetchableFluentQuery::one
        );
    }

    public Long createToken(Token token) {
        return createToken(token, false);
    }

    public Long createToken(Token token, Boolean existOk) {
        String symbol = token.getSymbol();
        if (symbol == null | Objects.equals(symbol, "")) {
            throw new CryptoPortfolioTrackerException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    "Missing required parameter 'symbol'"
            );
        }
        if (getTokenBySymbol(symbol).isPresent()) {
            if (existOk) {
                return getTokenBySymbol(symbol).get().getId();
            }
            throw new CryptoPortfolioTrackerException(
                    ErrorCode.RESOURCE_ALREADY_EXISTS,
                    "Token with symbol '%s' already exists".formatted(symbol)
            );
        }
        return tokenRepository.save(token).getId();
    }

    public void updateToken(Long id, Token newToken) {
        Token token = getTokenById(id);
        if (newToken.getName() != null) {
            token.setName(newToken.getName());
        }
        tokenRepository.save(token);
    }

    public void deleteToken(Long id) {
        Token token = getTokenById(id);
        tokenRepository.delete(token);
    }
}
