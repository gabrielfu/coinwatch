package com.gabrielfu.cryptoportfoliotracker.portfolio;

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
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final TokenRepository tokenRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public PortfolioService(
            PortfolioRepository portfolioRepository,
            TokenRepository tokenRepository,
            TransactionRepository transactionRepository
    ) {
        this.portfolioRepository = portfolioRepository;
        this.tokenRepository = tokenRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Portfolio> getPortfolios() {
        return portfolioRepository.findAll();
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id)
                .orElseThrow(() -> new CryptoPortfolioTrackerException(
                        ErrorCode.RESOURCE_NOT_FOUND,
                        "Portfolio with id '%s' not found".formatted(id)
                ));
    }

    public Optional<Portfolio> getPortfolioByName(String name) {
        Portfolio probe = new Portfolio();
        probe.setName(name);
        ExampleMatcher modelMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("name", ignoreCase());
        Example<Portfolio> example = Example.of(probe, modelMatcher);
        return portfolioRepository.findBy(
                example,
                FluentQuery.FetchableFluentQuery::one
        );
    }

    public Long createPortfolio(Portfolio portfolio) {
        String name = portfolio.getName();
        if (getPortfolioByName(name).isPresent()) {
            throw new CryptoPortfolioTrackerException(
                    ErrorCode.RESOURCE_ALREADY_EXISTS,
                    "Portfolio with name '%s' already exists".formatted(name)
            );
        }
        return portfolioRepository.save(portfolio).getId();
    }
}
