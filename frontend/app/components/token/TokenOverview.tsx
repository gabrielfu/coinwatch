'use client';

import { useRouter } from "next/navigation";
import { Text } from "rebass";
import Card from "../../components/Card";
import TokenTable from "./TokenTable";
import { AutoColumn } from "../Column";
import useAllTokenData from "@/dummy-data/all-tokens";

const TokenOverview = () => {
  const router = useRouter();

  const data = useAllTokenData();

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