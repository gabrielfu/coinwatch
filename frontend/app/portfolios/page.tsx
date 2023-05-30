'use client';

import { Box } from "rebass";
import { IoAddCircleOutline } from "react-icons/io5";
import Card from "../components/Card";
import { AutoColumn } from "../components/Column";
import { Label } from "../components/Text";
import PortfolioTable from "../components/portfolio/PortfolioTable";
import { twColors } from "../twConfig";


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
        <div className="flex w-full justify-between">
          <Label ml="16px" color="white" fontSize={24}>Portfolios</Label>
          <div className="hover:cursor-pointer">
            <Label backgroundColor={twColors.gmx.gray}
              marginBottom="12px" 
              padding="6px 12px" 
              width={180}
              height={42}
              justifyContent="space-between"
              style={{ 
                borderRadius: "8px",
              }}
            >
              <IoAddCircleOutline color="white" size={22} />
              <Box className="text-white text-[16px] font-semilight" margin="0 6px">
                Add Portfolio
              </Box>
            </Label>
          </div>
        </div>
        <PortfolioTable />
      </AutoColumn>
    </Card>
   );
}
 
export default PortfoliosPage;