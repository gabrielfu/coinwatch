'use client';

import Card from "../../components/Card";
import TokenTable from "./TokenTable";
import { AutoColumn } from "../Column";
import { useEffect, useState } from "react";
import { Label } from "../Text";
import { getTokenWithQuoteDatas } from "../actions/data";
import TokenSearch from "./TokenSearch";

const TokenOverview = () => {
  const [data, setData] = useState<TokenData[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTokenWithQuoteDatas()
      .then((tokenDatas) => {
        setData(tokenDatas);
        setLoading(false);
      })
  }, []);

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <Label justifyContent="space-between" marginBottom="16px">
          <Label ml="16px" color="white" fontSize={24}>All Tokens</Label>
          <TokenSearch />
        </Label>
        <TokenTable tokenDatas={data} />
      </AutoColumn>
    </Card>   
   );
}
 
export default TokenOverview;