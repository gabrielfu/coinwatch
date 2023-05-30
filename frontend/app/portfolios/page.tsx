'use client';

import Card from "../components/Card";
import { AutoColumn } from "../components/Column";
import { Label } from "../components/Text";
import PortfolioTable from "../components/portfolio/PortfolioTable";
import TokenSearch from "../components/token/TokenSearch";


const Header = () => {
  return (
    <Label>

    </Label>
   );
}


const PortfoliosPage = () => {
  return ( 
    <Card>
      <AutoColumn gap="8px">
        <Label ml="16px" color="white" fontSize={24}>Portfolios</Label>
        <PortfolioTable />
      </AutoColumn>
    </Card>
   );
}
 
export default PortfoliosPage;