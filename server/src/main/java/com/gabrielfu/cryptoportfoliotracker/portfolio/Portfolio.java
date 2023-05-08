package com.gabrielfu.cryptoportfoliotracker.portfolio;

import com.gabrielfu.cryptoportfoliotracker.transaction.Transaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Portfolio {
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
    private String name;

    @OneToMany(mappedBy = "portfolio")
    private Set<Transaction> transactions;
}
