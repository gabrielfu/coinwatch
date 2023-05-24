package com.coinwatch.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/portfolios")
public class PortfolioController {
    @Autowired
    private PortfolioService portfolioService;

    @GetMapping
    public List<Portfolio> getPortfolios() {
        return portfolioService.getPortfolios();
    }

    @GetMapping("{id}")
    public Portfolio getPortfolioById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id);
    }

    @GetMapping("/get-by-name")
    public Optional<Portfolio> getPortfolioByName(@RequestParam String name) {
        return portfolioService.getPortfolioByName(name);
    }

    @PostMapping
    public Long createPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.createPortfolio(portfolio);
    }

    @PutMapping("{id}")
    public void updatePortfolio(@PathVariable Long id, @RequestBody Portfolio portfolio) {
        portfolioService.updatePortfolio(id, portfolio);
    }

    @DeleteMapping("{id}")
    public void deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
    }
}
