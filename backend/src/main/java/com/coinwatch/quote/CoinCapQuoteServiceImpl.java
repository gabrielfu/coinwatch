package com.coinwatch.quote;

import com.coinwatch.clients.coincap.CoinCapAssetsResponse;
import com.coinwatch.clients.coincap.CoinCapClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Qualifier("coinCapService")
public class CoinCapQuoteServiceImpl implements QuoteService {

    private final CoinCapClient coinCapClient;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        CoinCapAssetsResponse response = coinCapClient.getAssets(token);
        return CoinCapDTOMapper.asSpotPriceDTOs(response).get(0);
    }

    @Override
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        CoinCapAssetsResponse response = coinCapClient.getAssets(tokens);
        List<SpotPriceDTO> dtos = CoinCapDTOMapper.asSpotPriceDTOs(response);
        Map<String, SpotPriceDTO> dtoMap = dtos.stream().collect(Collectors.toMap(SpotPriceDTO::symbol, item -> item));
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
