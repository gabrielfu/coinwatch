package com.coinwatch.clients.coincap;

import lombok.Getter;

public class TestUtils {
    @Getter
    private final static String coinCapAssetsJson = """
        {
          "data": [
            {
              "id": "bitcoin",
              "rank": "1",
              "symbol": "BTC",
              "name": "Bitcoin",
              "supply": "19587393.0000000000000000",
              "maxSupply": "21000000.0000000000000000",
              "marketCapUsd": "898290969352.4809861517359332",
              "volumeUsd24Hr": "11221051875.3087241063134153",
              "priceUsd": "45860.6701439278308324",
              "changePercent24Hr": "7.4964066661795701",
              "vwap24Hr": "43994.7338367590678365",
              "explorer": "https://blockchain.info/"
            },
            {
              "id": "bitcoin-bep2",
              "rank": "35",
              "symbol": "BTCB",
              "name": "Bitcoin BEP2",
              "supply": "53914.8298191000000000",
              "maxSupply": null,
              "marketCapUsd": "2307277428.2574827488080765",
              "volumeUsd24Hr": "2403792.0776945873839072",
              "priceUsd": "42794.8569252480693454",
              "changePercent24Hr": "-0.0004498601564577",
              "vwap24Hr": "33586.1792065806725516",
              "explorer": "https://explorer.binance.org/asset/BTCB-1DE"
            },
            {
              "id": "btc-standard-hashrate-token",
              "rank": "702",
              "symbol": "BTCST",
              "name": "Bitcoin Standard Hashrate Token",
              "supply": "0.0000000000000000",
              "maxSupply": "15000000.0000000000000000",
              "marketCapUsd": "0.0000000000000000",
              "volumeUsd24Hr": "40398.2404959977446948",
              "priceUsd": "0.4807926137464984",
              "changePercent24Hr": "-2.2570266136350385",
              "vwap24Hr": "0.4869627470294124",
              "explorer": "https://bscscan.com/token/0x78650b139471520656b9e7aa7a5e9276814a38e9"
            },
            {
               "id": "solana",
               "rank": "5",
               "symbol": "SOL",
               "name": "Solana",
               "supply": "430018634.2085221400000000",
               "maxSupply": null,
               "marketCapUsd": "49447804212.5614306619425055",
               "volumeUsd24Hr": "1021560808.7195171214193020",
               "priceUsd": "114.9899103874263469",
               "changePercent24Hr": "12.5060033744902158",
               "vwap24Hr": "109.7949843095534030",
               "explorer": "https://explorer.solana.com/"
             },
             {
               "id": "xrp",
               "rank": "6",
               "symbol": "XRP",
               "name": "XRP",
               "supply": "45404028640.0000000000000000",
               "maxSupply": "100000000000.0000000000000000",
               "marketCapUsd": "28755144124.7231421748811520",
               "volumeUsd24Hr": "381585817.0160917195624193",
               "priceUsd": "0.6333170202300168",
               "changePercent24Hr": "2.5827830648833139",
               "vwap24Hr": "0.6295038772920085",
               "explorer": "https://xrpcharts.ripple.com/#/graph/"
             }
          ],
          "timestamp": 1704186468977
        }
    """;
}
