package com.gabrielfu.cryptoportfoliotracker.tracking;

import com.gabrielfu.cryptoportfoliotracker.portfolio.PortfolioService;
import com.gabrielfu.cryptoportfoliotracker.token.TokenService;
import com.gabrielfu.cryptoportfoliotracker.transaction.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackingService {
    @Autowired
    private PortfolioService portfolioService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private TransactionService transactionService;

//    public TrackingPortfolioDTO getPortfolio() {
//
//    }
}
