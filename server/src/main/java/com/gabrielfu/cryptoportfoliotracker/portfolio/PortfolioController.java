package com.gabrielfu.cryptoportfoliotracker.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/portfolios")
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public List<Portfolio> getPortfolios() {
        return portfolioService.getPortfolios();
    }

    @GetMapping("{id}")
    public Portfolio getPortfolioById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id);
    }

    @GetMapping("{name}")
    public Optional<Portfolio> getPortfolioByName(@PathVariable String name) {
        return portfolioService.getPortfolioByName(name);
    }

    @PostMapping
    public Long createPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.createPortfolio(portfolio);
    }
}
