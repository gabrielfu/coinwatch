package com.gabrielfu.cryptoportfoliotracker.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {
}
