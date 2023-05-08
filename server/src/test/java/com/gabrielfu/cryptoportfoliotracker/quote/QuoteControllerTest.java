package com.gabrielfu.cryptoportfoliotracker.quote;

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
                3.0
        );
        String expectedJson = """
                {"symbol":"ETH-USD","marketPrice":1.0,"marketChange":2.0,"marketChangePercent":3.0}
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
                List.of(1L, 2L, 3L),
                List.of(1.0, 2.0, 3.0)
        );
        String expectedJson = """
                {"symbol":"ETH-USD","timestamp":[1,2,3],"close":[1.0,2.0,3.0]}
            """;
        given(quoteService.getTokenHistoricalPrices("ETH"))
                .willReturn(historicalPricesDTO);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/quote/historical?token=ETH"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }
}