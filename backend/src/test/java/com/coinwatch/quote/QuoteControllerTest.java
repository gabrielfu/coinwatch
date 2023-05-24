package com.coinwatch.quote;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class QuoteControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    private QuoteService quoteService;

    @InjectMocks
    private QuoteController quoteController;

    @BeforeEach
    public void setup() {
        initMocks(this);
        this.mockMvc =  MockMvcBuilders.standaloneSetup(quoteController).build();
    }

    @Test
    void getTokenSpotPrice() throws Exception {
        SpotPriceDTO spotPriceDTO = new SpotPriceDTO(
                "ETH-USD",
                1.0,
                2.0,
                3.0,
                4L,
                5L,
                6L
        );
        String expectedJson = """
                {"symbol":"ETH-USD","price":1.0,"priceChange":2.0,"priceChangePercent":3.0,"volume":4,"marketCap":5,"totalSupply":6}
            """;
        given(quoteService.getTokenSpotPrice("ETH"))
                .willReturn(spotPriceDTO);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/quote/spot?token=ETH"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    void getTokenHistoricalPrices() throws Exception{
        HistoricalPricesDTO historicalPricesDTO = new HistoricalPricesDTO(
                "ETH-USD",
                List.of(
                        new HistoricalPricesDTO.Series(1L, 1.0, 1.0, 1.0, 1.0, 1L),
                        new HistoricalPricesDTO.Series(2L, 2.0, 2.0, 2.0, 2.0, 2L)
                )
        );
        String expectedJson = """
                {"symbol":"ETH-USD","series":[{"time":1,"open":1.0,"high":1.0,"low":1.0,"volume":1},{"time":2,"open":2.0,"high":2.0,"low":2.0,"volume":2}]}
            """;
        given(quoteService.getTokenHistoricalPrices("ETH", null, null))
                .willReturn(historicalPricesDTO);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/quote/historical?token=ETH"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }
}