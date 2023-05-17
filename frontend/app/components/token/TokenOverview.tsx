'use client';

import Card from "../../components/Card";
import TokenTable from "./TokenTable";
import { AutoColumn } from "../Column";
import { useEffect, useState } from "react";
import { Label } from "../Text";

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
  logo: string;
}

interface QuoteData {
  symbol: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  marketCap: number;
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
                    volume: q.volume,
                    marketCap: q.marketCap,
                    logo: t.logo,
                  }
              })
              .filter(t => (t != null) && (t.marketCap > 1_000_000));
            setData(tokenDatas);
            setLoading(false);
          })
      });
  }, []);

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <Label>
          <Label ml="16px" color={"white"} fontSize={24} marginBottom="16px">All Tokens</Label>
        </Label>
        <TokenTable tokenDatas={data} />
      </AutoColumn>
    </Card>   
   );
}
 
export default TokenOverview;