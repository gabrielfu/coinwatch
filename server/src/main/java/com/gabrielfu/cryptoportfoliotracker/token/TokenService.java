package com.gabrielfu.cryptoportfoliotracker.token;

import com.gabrielfu.cryptoportfoliotracker.exceptions.CryptoPortfolioTrackerException;
import com.gabrielfu.cryptoportfoliotracker.exceptions.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    @Autowired
    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

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

    public Optional<Token> getTokenByName(String name) {
        Token probe = new Token();
        probe.setName(name);
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("name", ignoreCase());
        Example<Token> example = Example.of(probe, modelMatcher);
        return tokenRepository.findBy(
                example,
                FluentQuery.FetchableFluentQuery::one
        );
    }

    public Long createToken(Token token) {
        String name = token.getName();
        if (getTokenByName(name).isPresent()) {
            throw new CryptoPortfolioTrackerException(
                    ErrorCode.RESOURCE_ALREADY_EXISTS,
                    "Token with name '%s' already exists".formatted(name)
            );
        }
        return tokenRepository.save(token).getId();
    }
}
