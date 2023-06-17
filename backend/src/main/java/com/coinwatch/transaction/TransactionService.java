package com.coinwatch.transaction;

import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new CoinwatchException(
                        ErrorCode.RESOURCE_NOT_FOUND,
                        "Transaction with id '%s' not found".formatted(id)
                ));
    }

    public List<Transaction> searchTransactionByPortfolio(Long portfolioId) {
        return transactionRepository.findAll()
                .stream().filter(t -> Objects.equals(t.getPortfolio().getId(), portfolioId))
                .toList();
    }

    public Long createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction).getId();
    }

    public void updateTransaction(Long id, Transaction newTransaction) {
        Transaction transaction = getTransactionById(id);
        if (newTransaction.getDate() != null) {
            transaction.setDate(newTransaction.getDate());
        }
        if (newTransaction.getType() != null) {
            transaction.setType(newTransaction.getType());
        }
        if (newTransaction.getQuantity() != null) {
            transaction.setQuantity(newTransaction.getQuantity());
        }
        if (newTransaction.getPurchasePrice() != null) {
            transaction.setPurchasePrice(newTransaction.getPurchasePrice());
        }
        if (newTransaction.getPortfolio() != null) {
            transaction.setPortfolio(newTransaction.getPortfolio());
        }
        if (newTransaction.getToken() != null) {
            transaction.setToken(newTransaction.getToken());
        }
        transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        Transaction transaction = getTransactionById(id);
        transactionRepository.delete(transaction);
    }
}
