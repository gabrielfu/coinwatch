package com.gabrielfu.cryptoportfoliotracker.quote;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/quote")
@AllArgsConstructor
public class QuoteController {
    private final QuoteService quoteService;

    @GetMapping("spot")
    public SpotPriceDTO getTokenSpotPrice(@RequestParam String token) {
        return quoteService.getTokenSpotPrice(token);
    }

    @GetMapping("batch-spot")
    public List<SpotPriceDTO> batchGetTokenSpotPrice(@RequestParam String tokens) {
        return quoteService.batchGetTokenSpotPrice(Arrays.stream(tokens.split(",")).toList());
    }

    @GetMapping("historical")
    public HistoricalPricesDTO getTokenHistoricalPrices(
            @RequestParam String token,
            @RequestParam(required = false) String interval,
            @RequestParam(required = false) String range
    ) {
        return quoteService.getTokenHistoricalPrices(token, interval, range);
    }
}
