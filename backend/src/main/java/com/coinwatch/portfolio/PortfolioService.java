package com.coinwatch.portfolio;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

@Service
public class PortfolioService {
    @Autowired
    private PortfolioRepository portfolioRepository;

    public List<Portfolio> getPortfolios() {
        return portfolioRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Portfolio::getId))
                .toList();
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id)
                .orElseThrow(() -> new CoinwatchException(
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
        validatePortfolioName(name);
        return portfolioRepository.save(portfolio).getId();
    }

    public void updatePortfolio(Long id, Portfolio newPortfolio) {
        String name = newPortfolio.getName();
        validatePortfolioName(name);
        Portfolio portfolio = getPortfolioById(id);
        portfolio.setName(name);
        portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(Long id) {
        Portfolio portfolio = getPortfolioById(id);
        portfolioRepository.delete(portfolio);
    }

    private void validatePortfolioName(String name) {
        if (name == null | Objects.equals(name, "")) {
            throw new CoinwatchException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    "Missing required parameter 'name'"
            );
        }
        if (getPortfolioByName(name).isPresent()) {
            throw new CoinwatchException(
                    ErrorCode.RESOURCE_ALREADY_EXISTS,
                    "Portfolio with name '%s' already exists".formatted(name)
            );
        }
    }
}
