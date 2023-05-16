package com.gabrielfu.cryptoportfoliotracker.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/tokens")
public class TokenController {
    @Autowired
    private TokenService tokenService;

    @GetMapping
    public List<Token> getTokens() {
        return tokenService.getTokens();
    }

    @GetMapping("{symbol}")
    public Token getToken(@PathVariable String symbol) {
        return tokenService.getToken(symbol);
    }

    @PostMapping
    public String createToken(@RequestBody Token token) {
        return tokenService.createToken(token);
    }

    @PutMapping("{symbol}")
    public void updateToken(@PathVariable String symbol, @RequestBody Token token) {
        tokenService.updateToken(symbol, token);
    }

    @DeleteMapping("{symbol}")
    public void deleteToken(@PathVariable String symbol) {
        tokenService.deleteToken(symbol);
    }

    @PostMapping("/bootstrap")
    public void bootstrapToken() {
        tokenService.bootstrapTokens();
    }
}
