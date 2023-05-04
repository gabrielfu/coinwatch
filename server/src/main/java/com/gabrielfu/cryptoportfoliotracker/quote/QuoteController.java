package com.gabrielfu.cryptoportfoliotracker.quote;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/quote")
@AllArgsConstructor
public class QuoteController {
    private final QuoteService quoteService;

//    @GetMapping
//    public
}
