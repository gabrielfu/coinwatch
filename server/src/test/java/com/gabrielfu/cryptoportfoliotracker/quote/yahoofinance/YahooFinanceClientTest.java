package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RestClientTest(YahooFinanceClient.class)
class YahooFinanceClientTest {
    @Autowired
    private YahooFinanceClient yahooFinanceClient;

    @Autowired
    private MockRestServiceServer mockRestServiceServer;

    @Test
    void getQuote() {
        String json = """
            {
              "quoteResponse": {
                "result": [
                  {
                    "language": "en-US",
                    "region": "US",
                    "quoteType": "CRYPTOCURRENCY",
                    "typeDisp": "Cryptocurrency",
                    "quoteSourceName": "CoinMarketCap",
                    "triggerable": true,
                    "customPriceAlertConfidence": "HIGH",
                    "currency": "USD",
                    "esgPopulated": false,
                    "regularMarketChangePercent": 2.6048126,
                    "regularMarketPrice": 1928.1384,
                    "regularMarketChange": 48.949463,
                    "regularMarketOpen": 1901.058,
                    "averageDailyVolume3Month": 9079560796,
                    "averageDailyVolume10Day": 8320510120,
                    "startDate": 1438905600,
                    "coinImageUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
                    "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
                    "fiftyTwoWeekLowChange": 1032.0294,
                    "fiftyTwoWeekLowChangePercent": 1.1516784,
                    "fiftyTwoWeekRange": "896.109 - 2638.8306",
                    "fiftyTwoWeekHighChange": -710.69214,
                    "fiftyTwoWeekHighChangePercent": -0.26932088,
                    "fiftyTwoWeekLow": 896.109,
                    "fiftyTwoWeekHigh": 2638.8306,
                    "exchange": "CCC",
                    "shortName": "Ethereum USD",
                    "longName": "Ethereum USD",
                    "messageBoardId": "finmb_ETH_CCC",
                    "exchangeTimezoneName": "UTC",
                    "exchangeTimezoneShortName": "UTC",
                    "gmtOffSetMilliseconds": 0,
                    "market": "ccc_market",
                    "firstTradeDateMilliseconds": 1510185600000,
                    "priceHint": 2,
                    "circulatingSupply": 120344576,
                    "lastMarket": "CoinMarketCap",
                    "volume24Hr": 6907858432,
                    "volumeAllCurrencies": 6907858432,
                    "fromCurrency": "ETH",
                    "toCurrency": "USD=X",
                    "coinMarketCapLink": "https://coinmarketcap.com/currencies/ethereum",
                    "marketState": "REGULAR",
                    "fiftyDayAverage": 1873.9872,
                    "fiftyDayAverageChange": 54.151245,
                    "fiftyDayAverageChangePercent": 0.028896272,
                    "twoHundredDayAverage": 1539.2501,
                    "twoHundredDayAverageChange": 388.8883,
                    "twoHundredDayAverageChangePercent": 0.2526479,
                    "marketCap": 232040988672,
                    "sourceInterval": 15,
                    "exchangeDataDelayedBy": 0,
                    "tradeable": false,
                    "cryptoTradeable": true,
                    "regularMarketTime": 1683472380,
                    "regularMarketDayHigh": 1933.9984,
                    "regularMarketDayRange": "1892.4688 - 1933.9984",
                    "regularMarketDayLow": 1892.4688,
                    "regularMarketVolume": 6907858432,
                    "regularMarketPreviousClose": 1901.058,
                    "fullExchangeName": "CCC",
                    "symbol": "ETH-USD"
                  }
                ],
                "error": null
              }
            }
            """;
        String expectedUri = "https://query1.finance.yahoo.com/v6/finance/quote?symbols=ETH-USD";
        mockRestServiceServer
                .expect(requestTo(expectedUri))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));
        YahooFinanceQuoteResponse response = yahooFinanceClient.getQuote("ETH-USD");
        assertNotNull(response);
        assertEquals(
                response.getQuoteResponse().getResult().size(),
                1
        );
        assertEquals(
                response.getQuoteResponse().getResult().get(0).getSymbol(),
                "ETH-USD"
        );
        assertEquals(
                response.getQuoteResponse().getResult().get(0).getRegularMarketPrice(),
                1928.1384
        );
    }
}