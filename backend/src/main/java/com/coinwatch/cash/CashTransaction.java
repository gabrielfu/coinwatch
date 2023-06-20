package com.coinwatch.cash;

import com.coinwatch.portfolio.Portfolio;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
public class CashTransaction {
    @Id
    @SequenceGenerator(
            name = "cash_transaction_id_sequence",
            sequenceName = "cash_transaction_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cash_transaction_id_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Portfolio portfolio;

    private LocalDate date;

    private Double quantity;

    private CashTransactionType type;
}
