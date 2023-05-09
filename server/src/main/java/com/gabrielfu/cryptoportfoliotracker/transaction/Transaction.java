package com.gabrielfu.cryptoportfoliotracker.transaction;

import com.fasterxml.jackson.annotation.*;
import com.gabrielfu.cryptoportfoliotracker.portfolio.Portfolio;
import com.gabrielfu.cryptoportfoliotracker.token.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Long.class)
public class Transaction {
    @Id
    @SequenceGenerator(
            name = "transaction_id_sequence",
            sequenceName = "transaction_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transaction_id_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Portfolio portfolio;

    @ManyToOne
    @JoinColumn(name = "token_id")
    private Token token;

    private LocalDate date;

    private Double quantity;

    private Double purchasePrice;

    private TransactionType type;
}
