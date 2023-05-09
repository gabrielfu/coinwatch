package com.gabrielfu.cryptoportfoliotracker.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/tokens")
public class TokenController {
    private final TokenService tokenService;

    @Autowired
    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping
    public List<Token> getTokens() {
        return tokenService.getTokens();
    }

    @GetMapping("{id}")
    public Token getTokenById(@PathVariable Long id) {
        return tokenService.getTokenById(id);
    }

    @GetMapping("/get-by-symbol")
    public Optional<Token> getTokenBySymbol(@RequestParam String symbol) {
        return tokenService.getTokenBySymbol(symbol);
    }

    @PostMapping
    public Long createToken(@RequestBody Token token) {
        return tokenService.createToken(token);
    }

    @PutMapping("{id}")
    public void updateToken(@PathVariable Long id, @RequestBody Token token) {
        tokenService.updateToken(id, token);
    }

    @DeleteMapping("{id}")
    public void deleteToken(@PathVariable Long id) {
        tokenService.deleteToken(id);
    }
}
