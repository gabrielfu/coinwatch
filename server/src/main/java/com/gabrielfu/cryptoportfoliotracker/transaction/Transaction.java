package com.gabrielfu.cryptoportfoliotracker.transaction;

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
    @JoinColumn(
            name = "portfolio_id",
            foreignKey = @ForeignKey(
                    name = "transaction_portfolio_id_fk"
            )
    )
    private Portfolio portfolio;

    @ManyToOne
//    @JoinTable(
//            name = "Token",
//            joinColumns = { @JoinColumn(name = "id") }
//    )
    @JoinColumn(
            name = "token_id",
            foreignKey = @ForeignKey(
                    name = "transaction_token_id_fk"
            )
    )
    private Token token;

    private LocalDate date;

    private Double quantity;

    private Double purchasePrice;

    private TransactionType type;
}
