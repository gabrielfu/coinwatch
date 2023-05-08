package com.gabrielfu.cryptoportfoliotracker.portfolio;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {
    @Id
    @SequenceGenerator(
            name = "portfolio_id_sequence",
            sequenceName = "portfolio_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "portfolio_id_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @ManyToOne
    @JoinColumn(name = "token_id")
    private Token token;

    private LocalDateTime timestamp;

    private Double position;

    private Double averagePrice;
}
