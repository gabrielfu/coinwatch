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
        yahooFinanceQuoteResponse = objectMapper.readValue("""
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
        """, YahooFinanceQuoteResponse.class);
        yahooFinanceChartResponse = objectMapper.readValue("""
        {
          "chart": {
            "result": [
              {
                "meta": {
                  "symbol": "ETH-USD"
                },
                "timestamp": [
                  1683504000,
                  1683507600,
                  1683508980
                ],
                "indicators": {
                  "quote": [
                    {
                      "open": [
                        1872.47509765625,
                        1883.8590087890625,
                        1881.0113525390625
                      ],
                      "low": [
                        1867.871337890625,
                        1879.4700927734375,
                        1881.0113525390625
                      ],
                      "close": [
                        1882.529052734375,
                        1881.5496826171875,
                        1881.0113525390625
                      ],
                      "volume": [
                        504769536,
                        13790208,
                        0
                      ],
                      "high": [
                        1886.162109375,
                        1883.8590087890625,
                        1881.0113525390625
                      ]
                    }
                  ]
                }
              }
            ],
            "error": null
          }
        }
        """, YahooFinanceChartResponse.class);
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
        given(yahooFinanceClient.getTickerFromToken(token))
                .willReturn(ticker);
        given(yahooFinanceClient.getChart(ticker))
                .willReturn(yahooFinanceChartResponse);
        HistoricalPricesDTO historicalPricesDTO = yahooQuoteService.getTokenHistoricalPrices(token);
        assertEquals(historicalPricesDTO.symbol(), ticker);
        assertEquals(historicalPricesDTO.timestamp().size(), 3);
        assertEquals(historicalPricesDTO.close().size(), 3);
    }
}