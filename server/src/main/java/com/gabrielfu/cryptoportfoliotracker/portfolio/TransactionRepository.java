package com.gabrielfu.cryptoportfoliotracker.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {
}
