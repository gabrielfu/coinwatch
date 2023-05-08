package com.gabrielfu.cryptoportfoliotracker.portfolio;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Token {
    @Id
    @SequenceGenerator(
            name = "token_id_sequence",
            sequenceName = "token_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "token_id_sequence"
    )
    private Long id;
    private String symbol;
    private String name;

    @OneToMany(mappedBy = "token")
    private Set<Transaction> transactions;
}
