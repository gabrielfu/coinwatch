package com.gabrielfu.cryptoportfoliotracker.tracking;

import com.gabrielfu.cryptoportfoliotracker.portfolio.PortfolioService;
import com.gabrielfu.cryptoportfoliotracker.quote.QuoteService;
import com.gabrielfu.cryptoportfoliotracker.token.TokenService;
import com.gabrielfu.cryptoportfoliotracker.transaction.Transaction;
import com.gabrielfu.cryptoportfoliotracker.transaction.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TrackingService {
    @Autowired
    private PortfolioService portfolioService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private QuoteService quoteService;

//    public TrackingPortfolioDTO getPortfolio() {
//
//    }

    public Map<String, Position> getAll() {
        List<Transaction> transactions = transactionService.getTransactions();
        List<String> tokenSymbols = transactions.stream()
                .map(t -> t.getToken().getSymbol())
                .distinct()
                .toList();
        Map<String, Double> marketPrices = tokenSymbols.stream()
                .map(symbol -> Map.entry(symbol, quoteService.getTokenSpotPrice(symbol).price()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        return PositionCalculator.calculate(transactions, marketPrices);
    }
}
