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
import { OhlcData } from "lightweight-charts";
import { SiYahoo } from "react-icons/si";
import axios from "axios";
import { notFound } from "next/navigation";

const ContentLayout = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid mt-4 gap-6
      
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


const Header = ({ symbol, name, logo }: {
  symbol: string;
  name: string;
  logo: string;
}) => {
  return (
    <Label>
      <RowFixed>
        <TokenLogo src={logo} alt={name} size={20} />
      </RowFixed>
      <Label ml="16px" color="white" fontSize={24}>
        {name}
      </Label>
      <Label ml="8px" color={twColors.text} fontSize={24}>
        ({symbol})
      </Label>
    </Label>
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

const Widget = ({ data }: {data?: OhlcData}) => {
  if (!data) {
    return <div className="h-10 mt-4 screen800:mt-0"></div>;
  }

  const change = data.close - data.open;
  const changePercent = change / data.open * 100;
  const negative = isNegative(changePercent);
  const formatted = {
    open: formatPrice(data.open, false),
    high: formatPrice(data.high, false),
    low: formatPrice(data.low, false),
    close: formatPrice(data.close, false),
    change: formatPrice(change, false, data.open, true),
    changePercent: formatPriceChangePercent(changePercent),
  };
  const color = negative ? "text-tickDown" : "text-tickUp";
  return (
    <div className="text-white h-10 mt-4 screen800:mt-0">
      <span>O</span>
      <span className={color}>{formatted.open} </span>
      <span>H</span>
      <span className={color}>{formatted.high} </span>
      <span>L</span>
      <span className={color}>{formatted.low} </span>
      <span>C</span>
      <span className={color}>{formatted.close} &nbsp;</span>
      <br />
      <span className={color}>{formatted.change} ({formatted.changePercent})</span>
    </div>
  );
}

const TokenPage = ({ params }: {
  params: { symbol: string }
}) => {
  const symbol = params.symbol;
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [widgetLabel, setWidgetLabel] = useState<OhlcData>();
  const [isError, setIsError] = useState(false);

  const [quoteData, setQuoteData] = useState<TokenData>();
  const [chartData, setChartData] = useState<OhlcData[]>();
  const [interval, setInterval] = useState("15m");
  const [range, setRange] = useState("24h");

  const fetchChartData = useCallback(() => {    
    axios.get(`/api/v1/quote/historical?token=${symbol}&range=${range}&interval=${interval}`)
      .then((res) => res.data)
      .then((data: {series: OhlcData[]}) => {
        const series = data.series.filter(d => Object.values(d).every(v => v != null));
        setChartData(series);
      });
  }, [symbol, range, interval]);

  useEffect(() => {
    axios.get(`/api/v1/tokens/${symbol}`)
      .then((res) => res.data)
      .then((info) => {
        setName(info.name);
        setLogo(info.logo);
      })
      .catch(() => setIsError(true));
    
    axios.get(`/api/v1/quote/spot?token=${symbol}`)
      .then((res) => res.data)
      .then((info) => {
        setQuoteData(info);
      });
    
    fetchChartData();
  }, [symbol, fetchChartData]);

  if (isError) {
    notFound();
  }

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <div className="flex justify-between items-end">
          <div className="ml-2">
            <Header symbol={symbol} name={name} logo={logo} />
            {quoteData && 
              <PriceText 
                price={formatPrice(quoteData.price)} 
                priceChangePercent={formatPriceChangePercent(quoteData.priceChangePercent)} 
                negative={isNegative(quoteData.priceChangePercent)}
              />}
          </div>
          <a href={`https://finance.yahoo.com/quote/${symbol.toUpperCase()}-USD`} target="_blank">
            <SiYahoo size={18} className="text-white hover:cursor-pointer mr-8" />
          </a>
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
 
export default TokenPage;