package com.coinwatch.quote;

import com.coinwatch.quote.yahoofinance.TestUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.coinwatch.quote.yahoofinance.YahooFinanceChartResponse;
import com.coinwatch.quote.yahoofinance.YahooFinanceClient;
import com.coinwatch.quote.yahoofinance.YahooFinanceQuoteResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class YahooQuoteServiceImplTest {
    @Mock
    private YahooFinanceClient yahooFinanceClient;

    @InjectMocks
    private YahooQuoteServiceImpl yahooQuoteService;

    private String token = "ETH";
    private String ticker = "ETH-USD";
    private YahooFinanceQuoteResponse yahooFinanceQuoteResponse;
    private YahooFinanceChartResponse yahooFinanceChartResponse;

    @BeforeEach
    void setup() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        yahooFinanceQuoteResponse = objectMapper.readValue(
                TestUtils.getYahooFinanceQuoteJson(),
                YahooFinanceQuoteResponse.class
        );
        yahooFinanceChartResponse = objectMapper.readValue(
                TestUtils.getYahooFinanceChartJson(),
                YahooFinanceChartResponse.class
        );
    }

    @Test
    void getTokenSpotPrice() {
        given(yahooFinanceClient.getQuote(ticker))
                .willReturn(yahooFinanceQuoteResponse);
        SpotPriceDTO spotPriceDTO = yahooQuoteService.getTokenSpotPrice(token);
        assertEquals(spotPriceDTO.symbol(), YahooFinanceClient.getTokenFromTicker(ticker));
        assertEquals(spotPriceDTO.price(), 1928.1384);
        assertEquals(spotPriceDTO.priceChange(), 48.949463);
        assertEquals(spotPriceDTO.priceChangePercent(), 2.6048126);
    }

    @Test
    void getTokenHistoricalPrices() {
        given(yahooFinanceClient.getChart(ticker, (String) null, (String) null))
                .willReturn(yahooFinanceChartResponse);
        HistoricalPricesDTO historicalPricesDTO = yahooQuoteService.getTokenHistoricalPrices(token);
        assertEquals(historicalPricesDTO.symbol(), ticker);
        assertEquals(historicalPricesDTO.series().size(), 3);
    }
}