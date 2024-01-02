package com.coinwatch.clients.coingecko;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RestClientTest(CoinGeckoClient.class)
class CoinGeckoClientTest {

    @Autowired
    private CoinGeckoClient coinGeckoClient;

    @Autowired
    private MockRestServiceServer mockRestServiceServer;

    @Test
    void getTokens() {
        String json = TestUtils.getCoinGeckoTokensJson();
        String expectedUri = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
        mockRestServiceServer
                .expect(requestTo(expectedUri))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));
        List<CoinGeckoCoinsMarketsResponse> response = coinGeckoClient.getTokens();
        assertNotNull(response);
        assertEquals(
                response.size(),
                3
        );
        assertEquals(
                response.get(0).getSymbol(),
                "btc"
        );
    }

}