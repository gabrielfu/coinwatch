package com.gabrielfu.cryptoportfoliotracker.tracking;

import com.gabrielfu.cryptoportfoliotracker.portfolio.PortfolioService;
import com.gabrielfu.cryptoportfoliotracker.token.TokenService;
import com.gabrielfu.cryptoportfoliotracker.transaction.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackingService {
    private final PortfolioService portfolioService;
    private final TokenService tokenService;
    private final TransactionService transactionService;

    @Autowired
    public TrackingService(
            PortfolioService portfolioService,
            TokenService tokenService,
            TransactionService transactionService
    ) {
        this.portfolioService = portfolioService;
        this.tokenService = tokenService;
        this.transactionService = transactionService;
    }

//    public TrackingPortfolioDTO getPortfolio() {
//
//    }
}
