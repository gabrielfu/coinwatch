'use client';

import Card from "../../components/Card";
import TokenTable from "./TokenTable";
import { AutoColumn } from "../Column";
import { useEffect, useState } from "react";
import { Label } from "../Text";
import { getTokenWithQuoteDatas, TokenData } from "../../actions/data";
import TokenSearch from "./TokenSearch";

const TokenOverview = () => {
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
        <Label justifyContent="space-between" marginBottom="16px">
          <Label ml="16px" color="white" fontSize={24}>All Tokens</Label>
          <TokenSearch onChange={handleSearchChange} />
        </Label>
        <TokenTable tokenDatas={searchValue ? searchedData : data} />
      </AutoColumn>
    </Card>   
   );
}
 
export default TokenOverview;