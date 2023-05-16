'use client';

import Card from "@/app/components/Card";
import CandleChart from "@/app/components/charts/CandleChart";
import data from "@/dummy-data/daily-data";

const TokenPage = () => {
  return ( 
    <>
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
    </>
   );
}
 
export default TokenPage;