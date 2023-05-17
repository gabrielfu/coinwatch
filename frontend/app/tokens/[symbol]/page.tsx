'use client';

import { Text } from "rebass";
import Card from "@/app/components/Card";
import Column, { AutoColumn } from "@/app/components/Column";
import CandleChart from "@/app/components/charts/CandleChart";
import data from "@/dummy-data/daily-data";
import { RowBetween, RowFixed } from "@/app/components/Row";
import styled from "styled-components";
import { Label } from "@/app/components/Text";
import { twColors } from "@/app/twConfig";
import { useEffect, useState } from "react";
import TokenLogo from "@/app/components/token/TokenLogo";
import { formatPrice, formatPriceChange, formatDollarAmount, isNegative } from "@/app/components/util/format";

const ContentLayout = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 2fr 7fr;
  grid-gap: 2em;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 2fr 5fr;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
  }
`

const InfoRow = ({ rowName, rowValue }) => {
  return (
    <AutoColumn gap="2px" margin="0" justify="space-between">
      <Label color={twColors.gmx.text} fontWeight={400} fontSize={18}>
        {rowName}
      </Label>
      <Label color="white" fontWeight={600} fontSize={24}>
        {rowValue}
      </Label>
    </AutoColumn>
  );
}

const InfoTable = ({ data }) => {
  return (
    <AutoColumn gap="20px" margin="1em 2em 1em 2em" justify="flex-start">
      <InfoRow rowName="Volume" rowValue={formatDollarAmount(data.volume)} />
      <InfoRow rowName="Market Cap" rowValue={formatDollarAmount(data.marketCap)} />
    </AutoColumn>
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
        
        {/* <ResponsiveRow> */}
          <ContentLayout>
          <Card padding={"1rem 0 1rem 0"} backgroundColor={twColors.gmx.light}>
            {quoteData && <InfoTable data={quoteData}/>}
          </Card>
            
          <Card backgroundColor={twColors.gmx.light}>
            <CandleChart 
              data={data}
              height={400}
            />
          </Card>
          </ContentLayout>
        {/* </ResponsiveRow> */}
      </AutoColumn>
    </Card>
   );
}
 
export default TokenPage;