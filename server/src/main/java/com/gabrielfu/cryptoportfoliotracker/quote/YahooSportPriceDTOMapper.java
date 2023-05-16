package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import org.springframework.stereotype.Component;

@Component
public class YahooSportPriceDTOMapper {
    public static SpotPriceDTO asDTO(YahooFinanceQuoteResponse.Result result) {
        return new SpotPriceDTO(
                result.getSymbol(),
                result.getRegularMarketPrice(),
                result.getRegularMarketChange(),
                result.getRegularMarketChangePercent()
        );
    }
}
