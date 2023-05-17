'use client';

import { Text } from "rebass";
import Card from "@/app/components/Card";
import { AutoColumn } from "@/app/components/Column";
import CandleChart from "@/app/components/charts/CandleChart";
import data from "@/dummy-data/daily-data";
import { RowBetween, RowFixed } from "@/app/components/Row";
import styled from "styled-components";
import { Label } from "@/app/components/Text";
import { twColors } from "@/app/twConfig";
import { useEffect, useState } from "react";
import TokenLogo from "@/app/components/token/TokenLogo";
import { formatPrice, formatPriceChange, formatDollarAmount, isNegative } from "@/app/components/util/format";


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
      <Label color="white" fontSize={18}>
        {rowName}
      </Label>
      <Label color={twColors.gmx.text} end={1}>
        {rowValue}
      </Label>
    </RowBetween>
  );
}

const InfoTable = ({ data }) => {
  return (
    <ResponsiveRow>
      <Card>
        <AutoColumn gap="16px" margin="0 2em 0 2em" justify="space-between">
          <InfoRow rowName="Volume" rowValue={formatDollarAmount(data.volume)} />
          <InfoRow rowName="Market Cap" rowValue={formatDollarAmount(data.marketCap)} />
        </AutoColumn>
      </Card>
      <Card>
        <AutoColumn gap="16px" margin="0 2em 0 2em" justify="space-between">
          <InfoRow rowName="Key1" rowValue="Value1" />
          <InfoRow rowName="Key2" rowValue="Value2" />
        </AutoColumn>
      </Card>
    </ResponsiveRow>
   );
}


const Header = ({ symbol, name, logo }) => {
  return (
    <Label>
      <RowFixed>
        <TokenLogo src={logo} alt={name} size={20} />
      </RowFixed>
      <Label ml="16px" color={"white"} fontSize={24}>
        {name}
      </Label>
      <Label ml="8px" color={twColors.gmx.text} fontSize={24}>
        ({symbol})
      </Label>
    </Label>
  );
}


const TokenPage = ({ params }: {params: any}) => {
  const symbol: string = params.symbol;
  const [name, setName] = useState<string>();
  const [logo, setLogo] = useState<string>();

  const [quoteData, setQuoteData] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/tokens/${symbol}`)
      .then((res) => res.json())
      .then((info) => {
        setName(info.name);
        setLogo(info.logo);
      });
    
    fetch(`http://localhost:8080/api/v1/quote/spot?token=${symbol}`)
      .then((res) => res.json())
      .then((info) => {
        setQuoteData(info);
      });
  })

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <Header symbol={symbol} name={name} logo={logo} />
        
        <Card>
          {quoteData && <InfoTable data={quoteData}/>}
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