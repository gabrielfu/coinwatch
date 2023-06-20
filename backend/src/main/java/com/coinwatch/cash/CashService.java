package com.coinwatch.cash;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CashService {
    @Autowired
    private CashTransactionRepository cashTransactionRepository;

    public List<CashTransaction> getCashTransactions() {
        return cashTransactionRepository.findAll();
    }

    public CashTransaction getCashTransactionById(Long id) {
        return cashTransactionRepository.findById(id)
                .orElseThrow(() -> new CoinwatchException(
                        ErrorCode.RESOURCE_NOT_FOUND,
                        "Cash Transaction with id '%s' not found".formatted(id)
                ));
    }

    public List<CashTransaction> searchCashTransactionByPortfolio(Long portfolioId) {
        return cashTransactionRepository.findAll()
                .stream().filter(t -> Objects.equals(t.getPortfolio().getId(), portfolioId))
                .toList();
    }

    public Long createCashTransaction(CashTransaction transaction) {
        return cashTransactionRepository.save(transaction).getId();
    }

    public void updateCashTransaction(Long id, CashTransaction newTransaction) {
        CashTransaction transaction = getCashTransactionById(id);
        if (newTransaction.getDate() != null) {
            transaction.setDate(newTransaction.getDate());
        }
        if (newTransaction.getType() != null) {
            transaction.setType(newTransaction.getType());
        }
        if (newTransaction.getQuantity() != null) {
            transaction.setQuantity(newTransaction.getQuantity());
        }
        if (newTransaction.getPortfolio() != null) {
            transaction.setPortfolio(newTransaction.getPortfolio());
        }
        cashTransactionRepository.save(transaction);
    }

    public void deleteCashTransaction(Long id) {
        CashTransaction transaction = getCashTransactionById(id);
        cashTransactionRepository.delete(transaction);
    }
}
