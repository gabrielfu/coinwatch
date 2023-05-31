'use client';

import Card from "@/app/components/Card";
import TokenTable from "@/app/components/token/TokenTable";
import { AutoColumn } from "@/app/components/Column";
import { useEffect, useState } from "react";
import { Label } from "@/app/components/Text";
import { getTokenWithQuoteDatas, TokenData } from "@/app/actions/tokens";
import TokenSearch from "@/app/components/token/TokenSearch";

const TokensPage = () => {
  const [data, setData] = useState<TokenData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [searchedData, setSearchedData] = useState<TokenData[]>([]);

  useEffect(() => {
    setLoading(true);
    getTokenWithQuoteDatas()
      .then((tokenDatas) => {
        setData(tokenDatas);
        setLoading(false);
      })
  }, []);

  const handleSearchChange = (searchEvent: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = searchEvent.target.value;
    clearTimeout(searchTimeout);
    setSearchValue(searchValue);

    setSearchTimeout(
      setTimeout(() => {
        setSearchedData(data 
          ? data.filter(item => 
            (item.name.toLowerCase().match(searchValue) != null) || (item.symbol.toLowerCase().match(searchValue) != null)
          ) 
          : data);
      }, 250)
    );
  }

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <div className="
          grid grid-flow-row gap-4 w-full justify-between
          max-sm:auto-cols-min max-sm:grid-cols-[1fr] 
          sm:grid-cols-[1fr_1fr]
          lg:grid-cols-[2fr_1fr]
        ">
          <Label ml="16px" color="white" fontSize={24}>Tokens</Label>
          <TokenSearch width="100%" onChange={handleSearchChange} />
        </div>
        <TokenTable tokenDatas={searchValue ? searchedData : data} />
      </AutoColumn>
    </Card>
   );
}
 
export default TokensPage;