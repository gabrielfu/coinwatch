package com.coinwatch.quote;

import com.coinwatch.clients.coincap.CoinCapAssetsResponse;
import com.coinwatch.clients.coincap.CoinCapClient;
import com.coinwatch.clients.coincap.TestUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CoinCapQuoteServiceImplTest {
    @Mock
    private CoinCapClient coinCapClient;

    @InjectMocks
    private CoinCapQuoteServiceImpl coinCapQuoteService;

    private CoinCapAssetsResponse coinCapAssetsResponse;

    @BeforeEach
    void setup() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        coinCapAssetsResponse = objectMapper.readValue(
                TestUtils.getCoinCapAssetsJson(),
                CoinCapAssetsResponse.class
        );
    }

    @Test
    void getTokenSpotPrice() {
        String token = "BTC";
        given(coinCapClient.getAssets(token))
                .willReturn(coinCapAssetsResponse);
        SpotPriceDTO spotPriceDTO = coinCapQuoteService.getTokenSpotPrice(token);
        assertEquals(spotPriceDTO.price(), 45860.67014392783);
        assertEquals(spotPriceDTO.priceChange(), 3198.1555853305167);
        assertEquals(spotPriceDTO.priceChangePercent(), 7.4964066661795701);
    }

    @Test
    void batchGetTokenHistoricalPrices() {
        List<String> tokens = List.of("BTC", "SOL");
        given(coinCapClient.getAssets(tokens))
                .willReturn(coinCapAssetsResponse);
        List<SpotPriceDTO> dtos = coinCapQuoteService.batchGetTokenSpotPrice(tokens);
        assertEquals(dtos.get(0).symbol(), tokens.get(0));
        assertEquals(dtos.get(1).symbol(), tokens.get(1));
    }
}