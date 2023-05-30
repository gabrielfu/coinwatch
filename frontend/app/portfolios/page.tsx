'use client';

import { Box } from "rebass";
import { IoMdAddCircleOutline } from "react-icons/io";
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
              justifyContent="center"
              style={{ 
                borderRadius: "8px",
              }}
            >
              <IoMdAddCircleOutline color="white" size={22} />
              <Box className="text-white text-[16px] font-semilight" margin="0 12px">
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