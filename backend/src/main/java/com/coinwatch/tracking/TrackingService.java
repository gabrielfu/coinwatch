package com.coinwatch.tracking;

import com.coinwatch.portfolio.PortfolioService;
import com.coinwatch.transaction.Transaction;
import com.coinwatch.transaction.TransactionService;
import com.coinwatch.quote.QuoteService;
import com.coinwatch.token.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
    @Qualifier("hybridService")
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
