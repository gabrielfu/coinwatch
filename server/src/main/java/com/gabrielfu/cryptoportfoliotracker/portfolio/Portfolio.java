package com.gabrielfu.cryptoportfoliotracker.portfolio;

import com.gabrielfu.cryptoportfoliotracker.transaction.Transaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(indexes = @Index(columnList = "name"))
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

    @OneToMany(
            mappedBy = "portfolio",
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            fetch = FetchType.LAZY
    )
    private List<Transaction> transactions = new ArrayList<>();
}
