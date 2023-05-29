package com.coinwatch.quote;

import com.coinwatch.clients.coincap.CoinCapAssetsResponse;

import java.util.List;
import java.util.Objects;

public class CoinCapDTOMapper {
    public static List<SpotPriceDTO> asSpotPriceDTOs(CoinCapAssetsResponse response) {
        return response.getData()
                .stream().map(r -> {
                    Double price = Double.parseDouble(r.getPriceUsd());
                    Double priceChangePercent = Double.parseDouble(r.getChangePercent24Hr());
                    Double priceChange = price * (1 - 1 / (1 + priceChangePercent));
                    return new SpotPriceDTO(
                            r.getSymbol(),
                            price,
                            priceChange,
                            priceChangePercent,
                            (long) Double.parseDouble(Objects.requireNonNullElse(r.getVolumeUsd24Hr(), "0")),
                            (long) Double.parseDouble(Objects.requireNonNullElse(r.getMarketCapUsd(), "0")),
                            (long) Double.parseDouble(Objects.requireNonNullElse(r.getMaxSupply(), "0")));
                })
                .toList();
    }
}
