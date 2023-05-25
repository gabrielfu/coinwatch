package com.coinwatch.quote;

import com.coinwatch.clients.coingecko.CoinGeckoClient;
import com.coinwatch.clients.coingecko.CoinGeckoCoinsMarketsResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Qualifier("hybridService")
public class HybridQuoteServiceImpl implements QuoteService {
    private final YahooQuoteServiceImpl yahooQuoteService;
    private final CoinGeckoClient coinGeckoClient;

    @Override
    public SpotPriceDTO getTokenSpotPrice(String token) {
        List<CoinGeckoCoinsMarketsResponse> response = coinGeckoClient.getTokens()
                .stream()
                .filter(r -> Objects.equals(r.getSymbol().toUpperCase(), token))
                .toList();
        return CoinGeckoDTOMapper.asSpotPriceDTOs(response).get(0);
    }

    @Override
    public List<SpotPriceDTO> batchGetTokenSpotPrice(List<String> tokens) {
        List<CoinGeckoCoinsMarketsResponse> response = coinGeckoClient.getTokens()
                .stream()
                .filter(r -> tokens.contains(r.getSymbol().toUpperCase()))
                .toList();
        List<SpotPriceDTO> dtos = CoinGeckoDTOMapper.asSpotPriceDTOs(response);
        Map<String, SpotPriceDTO> dtoMap = dtos.stream().collect(Collectors.toMap(SpotPriceDTO::symbol, item -> item));
        return tokens.stream().map(t -> dtoMap.getOrDefault(t, null)).toList();
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token) {
        return yahooQuoteService.getTokenHistoricalPrices(token);
    }

    @Override
    public HistoricalPricesDTO getTokenHistoricalPrices(String token, String interval, String range) {
        return yahooQuoteService.getTokenHistoricalPrices(token, interval, range);
    }
}
