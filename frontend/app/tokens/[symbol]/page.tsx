'use client';

import { Text } from "rebass";
import Card from "@/app/components/Card";
import { AutoColumn } from "@/app/components/Column";
import CandleChart from "@/app/components/charts/CandleChart";
import data from "@/dummy-data/daily-data";
import { RowBetween } from "@/app/components/Row";
import styled from "styled-components";
import { Label } from "@/app/components/Text";
import { twColors } from "@/app/twConfig";


const ResponsiveRow = styled(RowBetween)`
  @media screen and (max-width: 679px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 24px;
    width: 100%:
  }
`

const InfoRow = ({ rowName, rowValue }) => {
  return (
    <RowBetween>
      <Label color={twColors.gmx.text}>
        {rowName}
      </Label>
      <Label color={twColors.gmx.text} end={1}>
        {rowValue}
      </Label>
    </RowBetween>
  );
}

const InfoTable = () => {
  return (
    <Card>
      <AutoColumn gap="16px" margin="0 2em 0 2em" justify="space-between">
        <InfoRow rowName="Key1" rowValue="Value1" />
        <InfoRow rowName="Key2" rowValue="Value2" />
      </AutoColumn>
    </Card>
   );
}


const TokenPage = ({ params }: {params: any}) => {
  const symbol: string = params.symbol;
  const name = "Ether";

  return ( 
    <Card>
      <AutoColumn>
        <Text className="text-white pb-4 text-xl font-medium">
          {name} ({symbol})
        </Text>
        <Card backgroundColor={twColors.gmx.light}>
          <ResponsiveRow>
            <InfoTable />
            <InfoTable />
          </ResponsiveRow>
        </Card>
          
        <Card backgroundColor={twColors.gmx.light}>
          <CandleChart 
            data={data}
            height={400}
          />
        </Card>
      </AutoColumn>
    </Card>
   );
}
 
export default TokenPage;