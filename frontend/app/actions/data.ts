

export interface TokenData {
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  volume: number;
  marketCap: number;
  totalSupply: number;
  logo: string;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  logo: string;
}

export interface QuoteData {
  symbol: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  marketCap: number;
  totalSupply: number;
}

export const getTokenWithQuoteDatas = async () => {
  return await fetch("http://localhost:8080/api/v1/tokens")
    .then((res) => res.json())
    .then(async (tokenInfos: TokenInfo[]) => {
      const symbols = tokenInfos.map(t => t.symbol).join(",");
      const innerRes = await fetch(`http://localhost:8080/api/v1/quote/batch-spot?tokens=${symbols}`)
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
                  totalSupply: q.totalSupply,
                  logo: t.logo,
                }
            })
            .filter(t => (t != null) && (t.marketCap > 1_000_000));
          return tokenDatas;
        });
        return innerRes;
    });
}