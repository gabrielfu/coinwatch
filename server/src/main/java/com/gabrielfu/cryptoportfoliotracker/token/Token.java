package com.gabrielfu.cryptoportfoliotracker.token;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Token {
    @Id
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
