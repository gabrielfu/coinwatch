'use client';

import Card from "../../components/Card";
import TokenTable from "./TokenTable";
import { AutoColumn } from "../Column";
import { useEffect, useState } from "react";
import { Label } from "../Text";
import { getTokenWithQuoteDatas } from "../actions/data";

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
        <Label>
          <Label ml="16px" color={"white"} fontSize={24} marginBottom="16px">All Tokens</Label>
        </Label>
        <TokenTable tokenDatas={data} />
      </AutoColumn>
    </Card>   
   );
}
 
export default TokenOverview;