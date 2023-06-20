package com.coinwatch.cash;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
import com.coinwatch.portfolio.PortfolioService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/cash")
public class CashController {
    @Autowired
    private CashService cashService;
    @Autowired
    private PortfolioService portfolioService;
    @Autowired
    private Validator validator;

    @GetMapping
    public List<CashTransaction> getCashTransactions() {
        return cashService.getCashTransactions();
    }

    @GetMapping("{id}")
    public CashTransaction getCashTransactionById(@PathVariable Long id) {
        return cashService.getCashTransactionById(id);
    }

    @GetMapping("search")
    public List<CashTransaction> searchCashTransactionByPortfolio(@RequestParam Long portfolioId) {
        return cashService.searchCashTransactionByPortfolio(portfolioId);
    }

    @PostMapping
    public Long createCashTransaction(@RequestBody CashTransactionRequest request) {
        Set<ConstraintViolation<CashTransactionRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            throw new CoinwatchException(
                    ErrorCode.INVALID_PARAMETER_VALUE,
                    new ConstraintViolationException(violations).getMessage()
            );
        }
        CashTransaction transaction = new CashTransaction();
        transaction.setPortfolio(portfolioService.getPortfolioById(request.portfolioId()));
        transaction.setDate(LocalDate.parse(request.date()));
        transaction.setQuantity(request.quantity());
        transaction.setType(CashTransactionType.fromString(request.type()));
        return cashService.createCashTransaction(transaction);
    }

    @PutMapping("{id}")
    public void updateCashTransaction(@PathVariable Long id, @RequestBody CashTransactionRequest request) {
        CashTransaction transaction = new CashTransaction();
        transaction.setDate(LocalDate.parse(request.date()));
        transaction.setQuantity(request.quantity());
        transaction.setType(CashTransactionType.fromString(request.type()));
        cashService.updateCashTransaction(id, transaction);
    }

    @DeleteMapping("{id}")
    public void deleteCashTransaction(@PathVariable Long id) {
        cashService.deleteCashTransaction(id);
    }
}
