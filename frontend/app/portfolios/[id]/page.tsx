'use client';

import React, { useCallback, useEffect, useState } from "react";
import CandleChart from "@/app/components/charts/CandleChart";
import RangeSelector from "@/app/components/charts/RangeSelector";
import Card from "@/app/components/Card";
import { AutoColumn } from "@/app/components/Column";
import { RowFixed } from "@/app/components/Row";
import { Label } from "@/app/components/Text";
import TokenLogo from "@/app/components/token/TokenLogo";
import { formatPrice, formatPriceChangePercent, formatDollarAmount, isNegative, formatInteger } from "@/app/components/util/format";
import { twColors } from "@/app/twConfig";
import { TokenData } from "@/app/actions/tokens";
import { OhlcData, SingleValueData } from "lightweight-charts";
import { SiYahoo } from "react-icons/si";

const ContentLayout = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid mt-4 gap-8
      
        max-screen800:auto-cols-min
        max-screen800:grid-cols-[1fr]
      
        screen800:max-lg:grid-cols-[2fr_5fr]

        lg:grid-cols-[2fr_7fr]
      "
    >
      {props.children}
    </div>
   );
}

const InfoRow = ({ rowName, rowValue }: {
  rowName: string;
  rowValue: string;
}) => {
  return (
    <AutoColumn gap="4px" margin="0" justify="space-between">
      <Label color={twColors.text} fontWeight={400} fontSize={18}>
        {rowName}
      </Label>
      <Label color="white" fontWeight={600} fontSize={24}>
        {rowValue}
      </Label>
    </AutoColumn>
  );
}

const InfoTable = ({ data }: {
  data: TokenData
}) => {
  return (
    <AutoColumn gap="20px" margin="1em 2em 1em 2em" justify="flex-start">
      <InfoRow rowName="Volume (24h)" rowValue={formatDollarAmount(data.volume)} />
      <InfoRow rowName="Market Cap" rowValue={formatDollarAmount(data.marketCap)} />
      <InfoRow rowName="Total Supply" rowValue={formatInteger(data.totalSupply)} />
    </AutoColumn>
   );
}

const PriceText = ({ price, priceChangePercent, negative }: {
  price: string;
  priceChangePercent: string;
  negative: boolean;
}) => {
  const color = (negative ?
    twColors.tickDown : 
    twColors.tickUp) as string;

  return ( 
    <Label mt="16px" color="white">
      <Label fontSize={36} mr="16px">
        {price}
      </Label>
      <Label fontSize={14} fontWeight={600} backgroundColor={color} padding="4px 8px" style={{ borderRadius: "8px" }}>
        {priceChangePercent}
      </Label>
    </Label>
   );
}

const Widget = ({ data }: {data?: SingleValueData}) => {
  if (!data) {
    return <div className="h-10 mt-4 screen800:mt-0"></div>;
  }

  const formatted = {
    value: formatPrice(data.value, false),
  };
  return (
    <div className="text-white h-10 mt-4 screen800:mt-0">
      <span>{formatted.value} </span>
    </div>
  );
}

const PortfolioPage = ({ params }: {
  params: { id: string }
}) => {
  const id = params.id;
  const [name, setName] = useState<string>("");
  const [widgetLabel, setWidgetLabel] = useState<SingleValueData>();

  const [quoteData, setQuoteData] = useState<TokenData>();
  const [chartData, setChartData] = useState<SingleValueData[]>();
  const [interval, setInterval] = useState("15m");
  const [range, setRange] = useState("24h");

  const fetchChartData = useCallback(() => {  
    // TODO  
    id;
    fetch(`/api/v1/quote/historical?token=AVAX&range=${range}&interval=${interval}`)
      .then((res) => res.json())
      .then((data: {series: OhlcData[]}) => {
        const series = data.series
          .filter(d => Object.values(d).every(v => v != null))
          .map(d => { return {
            time: d.time,
            value: d.open,
          } });
        setChartData(series);
      });
  }, [id, range, interval]);

  useEffect(() => {
    id;
    fetch(`/api/v1/tokens/AVAX`)
      .then((res) => res.json())
      .then((info) => {
        setName(info.name);
      });
    
    fetch(`/api/v1/quote/spot?token=AVAX`)
      .then((res) => res.json())
      .then((info) => {
        setQuoteData(info);
      });
    
    fetchChartData();
  }, [id, fetchChartData]);

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <div className="flex justify-between items-end">
          <div className="ml-2">
            <Label color="white" fontSize={24}>
              {name}
            </Label>

            {quoteData && 
              <PriceText 
                price={formatPrice(quoteData.price)} 
                priceChangePercent={formatPriceChangePercent(quoteData.priceChangePercent)} 
                negative={isNegative(quoteData.priceChangePercent)}
              />}
          </div>
        </div>

        <ContentLayout>
          <Card padding={"1rem 0 1rem 0"} backgroundColor={twColors.primary}>
            {quoteData && 
            <InfoTable data={quoteData}/>}
          </Card>

          <Card backgroundColor={twColors.primary}>
            {chartData == null 
              ? "Loading..."
              : <CandleChart 
                  data={chartData}
                  height={360}
                  seriesType="Line"
                  setValue={setWidgetLabel}
                  topLeft={<Widget data={widgetLabel} />}
                  topRight={<RangeSelector setRange={setRange} setInterval={setInterval} activeRange={range} activeInterval={interval} />}
                />
            }
          </Card>
        </ContentLayout>
      </AutoColumn>
    </Card>
   );
}
 
export default PortfolioPage;