package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class YahooSportPriceDTOMapper {
    public static List<SpotPriceDTO> asDTOs(YahooFinanceQuoteResponse response) {
        return response.getQuoteResponse().getResult()
                .stream().map(r -> new SpotPriceDTO(
                        YahooFinanceClient.getTokenFromTicker(r.getSymbol()),
                        r.getRegularMarketPrice(),
                        r.getRegularMarketChange(),
                        r.getRegularMarketChangePercent(),
                        r.getRegularMarketVolume(),
                        r.getMarketCap()))
                .toList();
    }
}
