package com.coinwatch.quote;

import com.coinwatch.clients.coincap.CoinCapAssetsResponse;
import com.coinwatch.clients.coincap.CoinCapClient;
import com.coinwatch.exceptions.CoinwatchException;
import com.coinwatch.exceptions.ErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

@Service
@AllArgsConstructor
@Qualifier("coinCapService")
public class CoinCapQuoteServiceImpl implements QuoteService {

    private final CoinCapClient coinCapClient;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        CoinCapAssetsResponse response = coinCapClient.getAssets(token);
        List<SpotPriceDTO> dtos = CoinCapDTOMapper.asSpotPriceDTOs(response);
        if (dtos.isEmpty()) {
            throw new CoinwatchException(
                    ErrorCode.RESOURCE_NOT_FOUND,
                    String.format("Unrecognized token %s", token)
            );
        }
        return dtos.get(0);
    }

    @Override
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        CoinCapAssetsResponse response = coinCapClient.getAssets(tokens);
        List<SpotPriceDTO> dtos = CoinCapDTOMapper.asSpotPriceDTOs(response);
        Map<String, SpotPriceDTO> dtoMap = dtos.stream()
                .collect(collectingAndThen(toCollection(() -> new TreeSet<>(comparing(SpotPriceDTO::symbol))),
                        ArrayList::new))
                .stream()
                .collect(Collectors.toMap(SpotPriceDTO::symbol, item -> item));
        return tokens.stream().map(t -> dtoMap.getOrDefault(t, null)).toList();
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token) {
        return null;
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token, String interval, String range) {
        return null;
    }
}
