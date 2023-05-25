package com.coinwatch.quote;

import com.coinwatch.clients.coingecko.CoinGeckoCoinsMarketsResponse;

import java.util.List;

public class CoinGeckoDTOMapper {
    public static List<SpotPriceDTO> asSpotPriceDTOs(List<CoinGeckoCoinsMarketsResponse> response) {
        return response.stream()
                .map(r -> new SpotPriceDTO(
                        r.getSymbol(),
                        r.getPrice(),
                        r.getPriceChange(),
                        r.getPriceChangePercent() / 100,
                        r.getVolume(),
                        r.getMarketCap(),
                        r.getTotalSupply().longValue()))
                .toList();
    }

}
