package com.gabrielfu.cryptoportfoliotracker.token;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository
        extends JpaRepository<Token, String> {
}
