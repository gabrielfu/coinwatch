'use client';

import { Text } from "rebass";
import Card from "../../components/Card";
import TokenTable from "./TokenTable";
import { AutoColumn } from "../Column";
import { useEffect, useState } from "react";

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  volume: number;
  marketCap: number;
  logo: string;
}

interface TokenInfo {
  name: string;
  symbol: string;
  image: string;
}

interface QuoteData {
  symbol: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
}

const TokenOverview = () => {
  const [data, setData] = useState<TokenData[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/v1/tokens")
      .then((res) => res.json())
      .then((tokenInfos: TokenInfo[]) => {
        const symbols = tokenInfos.map(t => t.symbol).join(",");
        fetch(`http://localhost:8080/api/v1/quote/batch-spot?tokens=${symbols}`)
          .then((res) => res.json())
          .then((quoteDatas: QuoteData[]) => {
            console.log("=======================");
            console.log(tokenInfos);
            console.log(quoteDatas);
            const tokenDatas: TokenData[] = tokenInfos
              .map((t, i) => {
                const q = quoteDatas[i];
                return q == null
                  ? null
                  : {
                    name: t.name,
                    symbol: t.symbol,
                    price: q.price,
                    priceChange: q.priceChangePercent,
                    volume: 1000 - i,
                    marketCap: 1000 - i,
                    logo: t.image,
                  }
              })
              .filter(t => t != null);
              console.log(tokenDatas);
              console.log("=======================");
            setData(tokenDatas);
            setLoading(false);
          })
      });
  }, []);

  return ( 
    <Card>
      <AutoColumn>
        <Text className="text-white pb-4 text-xl font-medium">All Tokens</Text>
        <TokenTable tokenDatas={data} />
      </AutoColumn>
    </Card>   
   );
}
 
export default TokenOverview;