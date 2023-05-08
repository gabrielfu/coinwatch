package com.gabrielfu.cryptoportfoliotracker.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository
        extends JpaRepository<Token, Long> {
}
