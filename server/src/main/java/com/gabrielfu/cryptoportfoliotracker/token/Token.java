package com.gabrielfu.cryptoportfoliotracker.token;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(indexes = @Index(columnList = "symbol"))
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
    private String image;

    @OneToMany(
            mappedBy = "token",
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            fetch = FetchType.LAZY
    )
    @JsonIgnore
    private List<Transaction> transactions = new ArrayList<>();
}
