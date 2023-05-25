package com.coinwatch.quote.yahoofinance;

import com.coinwatch.clients.yahoofinance.YahooFinanceChartResponse;
import com.coinwatch.clients.yahoofinance.YahooFinanceClient;
import com.coinwatch.clients.yahoofinance.YahooFinanceQuoteResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RestClientTest(YahooFinanceClient.class)
class YahooFinanceClientTest {
    @Autowired
    private YahooFinanceClient yahooFinanceClient;

    @Autowired
    private MockRestServiceServer mockRestServiceServer;

    @Test
    void getQuote() {
        String json = TestUtils.getYahooFinanceQuoteJson();
        String expectedUri = "https://query1.finance.yahoo.com/v6/finance/quote?symbols=ETH-USD";
        mockRestServiceServer
                .expect(requestTo(expectedUri))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote("ETH-USD");
        assertNotNull(response);
        assertEquals(
                response.getQuoteResponse().getResult().size(),
                1
        );
        assertEquals(
                response.getQuoteResponse().getResult().get(0).getSymbol(),
                "ETH-USD"
        );
        assertEquals(
                response.getQuoteResponse().getResult().get(0).getRegularMarketPrice(),
                1928.1384
        );
    }

    @Test
    void getChart() {
        String json = TestUtils.getYahooFinanceChartJson();
        String expectedUri = "https://query1.finance.yahoo.com/v8/finance/chart/ETH-USD";
        mockRestServiceServer
                .expect(requestTo(expectedUri))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));
        YahooFinanceChartResponse response = yahooFinanceClient.getChart("ETH-USD");
        assertNotNull(response);
        assertEquals(
                response.getChart().getResult().size(),
                1
        );
        assertEquals(
                response.getChart().getResult().get(0).getMeta().getSymbol(),
                "ETH-USD"
        );
        assertEquals(
                response.getChart().getResult().get(0).getIndicators().getQuote().get(0).getClose().size(),
                3
        );
        assertEquals(
                response.getChart().getResult().get(0).getTimestamp().size(),
                3
        );
    }
}