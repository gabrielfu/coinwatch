package com.coinwatch.clients.coingecko;

import lombok.Getter;

public class TestUtils {
    @Getter
    private final static String coinGeckoTokensJson = """
        [
          {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
            "current_price": 45762,
            "market_cap": 897990245447,
            "market_cap_rank": 1,
            "fully_diluted_valuation": 962750432670,
            "total_volume": 21213527489,
            "high_24h": 45870,
            "low_24h": 42583,
            "price_change_24h": 3171.97,
            "price_change_percentage_24h": 7.4477,
            "market_cap_change_24h": 64620531005,
            "market_cap_change_percentage_24h": 7.75413,
            "circulating_supply": 19587418.0,
            "total_supply": 21000000.0,
            "max_supply": 21000000.0,
            "ath": 69045,
            "ath_change_percentage": -33.65242,
            "ath_date": "2021-11-10T14:24:11.849Z",
            "atl": 67.81,
            "atl_change_percentage": 67456.72011,
            "atl_date": "2013-07-06T00:00:00.000Z",
            "roi": null,
            "last_updated": "2024-01-02T09:20:01.352Z"
          },
          {
            "id": "ethereum",
            "symbol": "eth",
            "name": "Ethereum",
            "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
            "current_price": 2424.1,
            "market_cap": 291653266501,
            "market_cap_rank": 2,
            "fully_diluted_valuation": 291653266501,
            "total_volume": 11893158111,
            "high_24h": 2434.45,
            "low_24h": 2290.27,
            "price_change_24h": 133.46,
            "price_change_percentage_24h": 5.82635,
            "market_cap_change_24h": 16843703155,
            "market_cap_change_percentage_24h": 6.12923,
            "circulating_supply": 120185070.566525,
            "total_supply": 120185070.566525,
            "max_supply": null,
            "ath": 4878.26,
            "ath_change_percentage": -50.24382,
            "ath_date": "2021-11-10T14:24:19.604Z",
            "atl": 0.432979,
            "atl_change_percentage": 560489.98957,
            "atl_date": "2015-10-20T00:00:00.000Z",
            "roi": {
              "times": 69.84177850667018,
              "currency": "btc",
              "percentage": 6984.177850667017
            },
            "last_updated": "2024-01-02T09:19:59.130Z"
          },
          {
            "id": "tether",
            "symbol": "usdt",
            "name": "Tether",
            "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
            "current_price": 1.0,
            "market_cap": 91786570167,
            "market_cap_rank": 3,
            "fully_diluted_valuation": 91786570167,
            "total_volume": 43722748241,
            "high_24h": 1.005,
            "low_24h": 0.996406,
            "price_change_24h": 0.00010445,
            "price_change_percentage_24h": 0.01045,
            "market_cap_change_24h": 39956006,
            "market_cap_change_percentage_24h": 0.04355,
            "circulating_supply": 91710003321.2887,
            "total_supply": 91710003321.2887,
            "max_supply": null,
            "ath": 1.32,
            "ath_change_percentage": -24.24939,
            "ath_date": "2018-07-24T00:00:00.000Z",
            "atl": 0.572521,
            "atl_change_percentage": 75.05957,
            "atl_date": "2015-03-02T00:00:00.000Z",
            "roi": null,
            "last_updated": "2024-01-02T09:15:01.621Z"
          }
        ]
        """;
}
