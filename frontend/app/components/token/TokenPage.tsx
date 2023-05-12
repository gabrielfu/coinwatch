import Container from "../Container";
import CandleChart from "../candleChart/CandleChart";

import data from "@/dummy-data/daily-data";

const TokenPage = () => {
  return ( 
    <Container>
        <div className="pt-24">
          <div className="text-white">
            Home &gt; Tokens &gt; ETH
          </div>
          <CandleChart 
            data={data}
            height={400}
          />
        </div>
      </Container>   
   );
}
 
export default TokenPage;