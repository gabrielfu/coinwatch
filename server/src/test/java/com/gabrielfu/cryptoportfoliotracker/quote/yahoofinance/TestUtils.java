package com.gabrielfu.cryptoportfoliotracker.quote.yahoofinance;

public class TestUtils {
    private final static String yahooFinanceQuoteJson = """
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
    private final static String yahooFinanceChartJson = """
            {
              "chart": {
                "result": [
                  {
                    "meta": {
                      "currency": "USD",
                      "symbol": "ETH-USD",
                      "exchangeName": "CCC",
                      "instrumentType": "CRYPTOCURRENCY",
                      "firstTradeDate": 1510185600,
                      "regularMarketTime": 1683508980,
                      "gmtoffset": 0,
                      "timezone": "UTC",
                      "exchangeTimezoneName": "UTC",
                      "regularMarketPrice": 1881.0114,
                      "chartPreviousClose": 1867.8713,
                      "previousClose": 1867.8713,
                      "scale": 4,
                      "priceHint": 2,
                      "currentTradingPeriod": {
                        "pre": {
                          "timezone": "UTC",
                          "start": 1683504000,
                          "end": 1683504000,
                          "gmtoffset": 0
                        },
                        "regular": {
                          "timezone": "UTC",
                          "start": 1683504000,
                          "end": 1683590340,
                          "gmtoffset": 0
                        },
                        "post": {
                          "timezone": "UTC",
                          "start": 1683590340,
                          "end": 1683590340,
                          "gmtoffset": 0
                        }
                      },
                      "tradingPeriods": [
                        [
                          {
                            "timezone": "UTC",
                            "start": 1683504000,
                            "end": 1683590340,
                            "gmtoffset": 0
                          }
                        ]
                      ],
                      "dataGranularity": "1h",
                      "range": "1d",
                      "validRanges": [
                        "1d",
                        "5d",
                        "1mo",
                        "3mo",
                        "6mo",
                        "1y",
                        "2y",
                        "5y",
                        "10y",
                        "ytd",
                        "max"
                      ]
                    },
                    "timestamp": [
                      1683504000,
                      1683507600,
                      1683508980
                    ],
                    "indicators": {
                      "quote": [
                        {
                          "open": [
                            1872.47509765625,
                            1883.8590087890625,
                            1881.0113525390625
                          ],
                          "low": [
                            1867.871337890625,
                            1879.4700927734375,
                            1881.0113525390625
                          ],
                          "close": [
                            1882.529052734375,
                            1881.5496826171875,
                            1881.0113525390625
                          ],
                          "volume": [
                            504769536,
                            13790208,
                            0
                          ],
                          "high": [
                            1886.162109375,
                            1883.8590087890625,
                            1881.0113525390625
                          ]
                        }
                      ]
                    }
                  }
                ],
                "error": null
              }
            }
            """;

    public static String getYahooFinanceQuoteJson() {
        return yahooFinanceQuoteJson;
    }

    public static String getYahooFinanceChartJson() {
        return yahooFinanceChartJson;
    }
}
