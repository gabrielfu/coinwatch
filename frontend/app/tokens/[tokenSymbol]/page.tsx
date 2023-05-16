'use client';

import Card from "../../components/Card";
import CandleChart from "../../components/charts/CandleChart";
import ClientOnly from "@/app/components/ClientOnly";

import data from "@/dummy-data/daily-data";

const TokenPage = () => {
  return ( 
    <ClientOnly>
      <div className="text-white">
        Home &gt; Tokens &gt; ETH
      </div>
      <Card>
        <div className="justify-between w-full">
          <CandleChart 
            data={data}
            height={400}
          />
        </div>
      </Card>   
    </ClientOnly>
   );
}
 
export default TokenPage;