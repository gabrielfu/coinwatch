package com.gabrielfu.cryptoportfoliotracker.quote;

import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceChartResponse;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.IntStream;

@Component
public class YahooDTOMapper {
    public static List<SpotPriceDTO> asSpotPriceDTOs(YahooFinanceQuoteResponse response) {
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

    public static HistoricalPricesDTO asHistoricalPricesDTO(YahooFinanceChartResponse response) {
        YahooFinanceChartResponse.Result result = response.getChart().getResult().get(0);
        List<Long> time = result.getTimestamp();
        YahooFinanceChartResponse.Quote ohlcv = result.getIndicators().getQuote().get(0);
        List<HistoricalPricesDTO.Series> series = IntStream.range(0, time.size())
                .mapToObj(i -> new HistoricalPricesDTO.Series(
                        time.get(i),
                        ohlcv.getOpen().get(i),
                        ohlcv.getHigh().get(i),
                        ohlcv.getLow().get(i),
                        ohlcv.getClose().get(i),
                        ohlcv.getVolume().get(i)
                ))
                .toList();
        return new HistoricalPricesDTO(
                result.getMeta().getSymbol(),
                series
        );
    }
}
