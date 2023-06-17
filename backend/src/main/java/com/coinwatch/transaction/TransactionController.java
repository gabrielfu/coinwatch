package com.coinwatch.transaction;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
import com.coinwatch.portfolio.PortfolioService;
import com.coinwatch.token.TokenService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private PortfolioService portfolioService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private Validator validator;

    @GetMapping
    public List<Transaction> getTransactions() {
        return transactionService.getTransactions();
    }

    @GetMapping("{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("search")
    public List<Transaction> searchTransactionByPortfolio(@RequestParam Long portfolioId) {
        return transactionService.searchTransactionByPortfolio(portfolioId);
    }

    @PostMapping
    public Long createTransaction(@RequestBody TransactionRequest request) {
        Set<ConstraintViolation<TransactionRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            throw new CoinwatchException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    new ConstraintViolationException(violations).getMessage()
            );
        }
        Transaction transaction = new Transaction();
        transaction.setPortfolio(portfolioService.getPortfolioById(request.portfolioId()));
        transaction.setToken(tokenService.getToken(request.tokenSymbol()));
        transaction.setDate(LocalDate.parse(request.date()));
        transaction.setQuantity(request.quantity());
        transaction.setPurchasePrice(request.purchasePrice());
        transaction.setType(TransactionType.fromString(request.type()));
        return transactionService.createTransaction(transaction);
    }

    @PutMapping("{id}")
    public void updateTransaction(@PathVariable Long id, @RequestBody TransactionRequest request) {
        Transaction transaction = new Transaction();
        transaction.setDate(LocalDate.parse(request.date()));
        transaction.setQuantity(request.quantity());
        transaction.setPurchasePrice(request.purchasePrice());
        transaction.setType(TransactionType.fromString(request.type()));
        transactionService.updateTransaction(id, transaction);
    }

    @DeleteMapping("{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }
}
