'use client';

import { Text } from "rebass";
import Card from "@/app/components/Card";
import { AutoColumn } from "@/app/components/Column";
import CandleChart from "@/app/components/charts/CandleChart";
import data from "@/dummy-data/daily-data";

const TokenPage = ({ params }) => {
  const symbol = params.symbol;
  const name = "Ether"

  return ( 
    <Card>
      <AutoColumn>
        <Text className="text-white pb-4 text-xl font-medium">
          {name} ({symbol})
        </Text>
        <div className="justify-between w-full">
          <CandleChart 
            data={data}
            height={400}
          />
        </div>
      </AutoColumn>
    </Card>
   );
}
 
export default TokenPage;