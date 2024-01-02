package com.coinwatch.clients.coincap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RestClientTest(CoinCapClient.class)
class CoinCapClientTest {
    @Autowired
    private CoinCapClient coinCapClient;

    @Autowired
    private MockRestServiceServer mockRestServiceServer;

    @Test
    void getAssets() {
        String json = TestUtils.getCoinCapAssetsJson();
        String expectedUri = "https://api.coincap.io/v2/assets?search=BTC";
        mockRestServiceServer
                .expect(requestTo(expectedUri))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));
        CoinCapAssetsResponse response = coinCapClient.getAssets("BTC");
        assertNotNull(response);
        assertEquals(
                response.getData().size(),
                1
        );
        assertEquals(
                response.getData().get(0).getSymbol(),
                "BTC"
        );
    }


    @Test
    void getAssets1() {
        String json = TestUtils.getCoinCapAssetsJson();
        String expectedUri = "https://api.coincap.io/v2/assets?limit=500";
        mockRestServiceServer
                .expect(requestTo(expectedUri))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));
        CoinCapAssetsResponse response = coinCapClient.getAssets(List.of("BTC", "SOL"));
        assertNotNull(response);
        assertEquals(
                response.getData().size(),
                2
        );
        assertEquals(
                response.getData().get(0).getSymbol(),
                "BTC"
        );
        assertEquals(
                response.getData().get(1).getSymbol(),
                "SOL"
        );
    }
}