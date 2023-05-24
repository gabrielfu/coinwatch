package com.coinwatch.tracking;

import com.coinwatch.transaction.Transaction;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PositionCalculator {
    public static Map<String, Position> calculate(
            List<Transaction> transactions,
            Map<String, Double> marketPrices
    ) {
        Map<String, List<Transaction>> transactionsByToken = transactions.stream()
                .collect(Collectors.groupingBy(t -> t.getToken().getSymbol()));
        return transactionsByToken.entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> getPositionFromTransactions(e.getValue(), marketPrices.get(e.getKey()))
                ));
    }

    private static Position getPositionFromTransactions(List<Transaction> ts, Double marketPrice) {
        Double quantity = ts.stream()
                .map(Transaction::getQuantity)
                .mapToDouble(Double::doubleValue)
                .sum();
        Double costBasis = ts.stream()
                .map(t -> t.getQuantity() * t.getPurchasePrice())
                .mapToDouble(Double::doubleValue)
                .sum();
        Double averagePrice = costBasis / quantity;
        Double marketValue = quantity * marketPrice;
        Double change = marketValue - costBasis;
        Double changePercent = change / costBasis;
        return new Position(quantity, averagePrice, costBasis, marketPrice, marketValue, change, changePercent);
    }
}


