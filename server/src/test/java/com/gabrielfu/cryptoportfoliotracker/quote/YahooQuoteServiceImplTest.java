package com.gabrielfu.cryptoportfoliotracker.quote;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceChartResponse;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceClient;
import com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance.YahooFinanceQuoteResponse;
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
        String json = """
        {
          "quoteResponse": {
            "result": [
              {
                "regularMarketChangePercent": 2.6048126,
                "regularMarketPrice": 1928.1384,
                "regularMarketChange": 48.949463,
                "symbol": "ETH-USD"
              }
            ],
            "error": null
          }
        }
        """;
        yahooFinanceQuoteResponse = objectMapper.readValue(json, YahooFinanceQuoteResponse.class);
        System.out.println(yahooFinanceQuoteResponse);
    }

    @Test
    void getTokenSpotPrice() {
        given(yahooFinanceClient.getTickerFromToken(token))
                .willReturn(ticker);
        given(yahooFinanceClient.getQuote(ticker))
                .willReturn(yahooFinanceQuoteResponse);
        SpotPriceDTO spotPriceDTO = yahooQuoteService.getTokenSpotPrice(token);
        assertEquals(spotPriceDTO.symbol(), ticker);
        assertEquals(spotPriceDTO.marketPrice(), 1928.1384);
        assertEquals(spotPriceDTO.marketChange(), 48.949463);
        assertEquals(spotPriceDTO.marketChangePercent(), 2.6048126);
    }

    @Test
    void getTokenHistoricalPrices() {
    }
}