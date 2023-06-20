package com.coinwatch.cash;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CashTransactionRepository
        extends JpaRepository<CashTransaction, Long> {
}
