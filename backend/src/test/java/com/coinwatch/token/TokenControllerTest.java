package com.coinwatch.token;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.doNothing;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class TokenControllerTest {
    private MockMvc mockMvc;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private TokenController tokenController;

    @BeforeEach
    void setUp() {
        initMocks(this);
        this.mockMvc =  MockMvcBuilders.standaloneSetup(tokenController).build();
    }

    @Test
    void getTokens() throws Exception {
        List<Token> tokens = List.of(
                new Token("BTC", "Bitcoin", "btc.png"),
                new Token("ETH", "Ethereum", "eth.png"),
                new Token("ADA", "Cardano", "ada.png")
        );
        String expectedJson = """
                [{"symbol":"BTC","name":"Bitcoin","logo":"btc.png"},{"symbol":"ETH","name":"Ethereum","logo":"eth.png"},{"symbol":"ADA","name":"Cardano","logo":"ada.png"}]
            """;
        given(tokenService.getTokens())
                .willReturn(tokens);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tokens"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    void getToken() throws Exception {
        Token token = new Token("BTC", "Bitcoin", "btc.png");
        String expectedJson = """
                {"symbol":"BTC","name":"Bitcoin","logo":"btc.png"}
            """;
        given(tokenService.getToken("BTC"))
                .willReturn(token);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tokens/BTC"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    void createToken() throws Exception {
        Token token = new Token("BTC", "Bitcoin", "btc.png");
        String symbol = token.getSymbol();
        given(tokenService.createToken(token))
                .willReturn(symbol);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/tokens")
                .contentType("application/json")
                .content("""
                        {"symbol":"BTC","name":"Bitcoin","logo":"btc.png"}
                    """))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(symbol));
    }

    @Test
    void updateToken() throws Exception {
        Token token = new Token("BTC", "Bitcoin", "btc.png");
        String symbol = token.getSymbol();
        doNothing().when(tokenService).updateToken(symbol, token);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/tokens/BTC")
                .contentType("application/json")
                .content("""
                        {"symbol":"BTC","name":"Bitcoin","logo":"btc.png"}
                    """))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void deleteToken() throws Exception {
        String symbol = "BTC";
        doNothing().when(tokenService).deleteToken(symbol);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/tokens/BTC"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void bootstrapToken() {
        doNothing().when(tokenService).bootstrapTokens();
        assertDoesNotThrow(() -> mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/tokens/bootstrap")));
    }
}