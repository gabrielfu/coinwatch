'use client';

import React, { useCallback, useEffect, useState } from "react";
import RangeSelector from "@/app/components/charts/RangeSelector";
import Card from "@/app/components/Card";
import { AutoColumn } from "@/app/components/Column";
import { Label } from "@/app/components/Text";
import { formatPrice, formatPriceChangePercent, formatDollarAmount, isNegative, formatInteger } from "@/app/components/util/format";
import { twColors } from "@/app/twConfig";
import { TokenData } from "@/app/actions/tokens";
import { OhlcData, LineData } from "lightweight-charts";
import { MdOutlineDelete } from "react-icons/md";
import LineChart from "@/app/components/charts/LineChart";
import { Box, Text } from "rebass";
import useDeletePortfolioModal from "@/app/hooks/useDeletePortfolioModal";
import TransactionTable from "@/app/components/portfolio/TransactionTable";
import SummaryTable from "@/app/components/portfolio/SummaryTable";
import AddTransactionForm from "@/app/components/portfolio/AddTransactionForm";
import { TransactionResponse, searchTransactionsByPortfolio } from "@/app/actions/transactions";
import { PortfolioInfo, getPortfolio } from "@/app/actions/portfolios";

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
      <InfoRow rowName="Market Value" rowValue={formatDollarAmount(data.volume)} />
      <InfoRow rowName="Total Returns" rowValue={formatDollarAmount(data.marketCap)} />
      <InfoRow rowName="Annualized Returns" rowValue={formatInteger(data.totalSupply)} />
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

const Widget = ({ data }: {data?: LineData}) => {
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
  const portfolioId = params.id;
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [widgetLabel, setWidgetLabel] = useState<LineData>();

  const [quoteData, setQuoteData] = useState<TokenData>();
  const [chartData, setChartData] = useState<LineData[]>();
  const [interval, setInterval] = useState("15m");
  const [range, setRange] = useState("24h");

  const deletePortfolioModal = useDeletePortfolioModal();

  const [portfolio, setPortfolio] = useState<PortfolioInfo>({ id: parseInt(portfolioId), name: "-" });
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  const fetchChartData = useCallback(() => {  
    // TODO  
    portfolioId;
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
  }, [portfolioId, range, interval]);

  useEffect(() => {
    getPortfolio(portfolioId)
      .then((data) => {
        setPortfolio(data);
        deletePortfolioModal.setPortfolioName(data.name);
      });
    
    fetch(`/api/v1/quote/spot?token=AVAX`)
      .then((res) => res.json())
      .then((info) => {
        setQuoteData(info);
      });
    
    fetchChartData();
    deletePortfolioModal.setPortfolioId(portfolioId.toString());
  }, [portfolioId, fetchChartData]);

  const refreshTransactions = () => {
    searchTransactionsByPortfolio(portfolioId)
      .then(data => {
        setTransactions(data);
        setIsEmpty(data.length <= 0);
      });
  }

  useEffect(() => {
    refreshTransactions();
  }, []);

  return ( 
    <Card>
      <AutoColumn gap="8px">
        <div className="flex w-full justify-between items-end">
          <div className="ml-2">
            <Label color="white" fontSize={24}>
              {portfolio.name}
            </Label>

            {isEmpty && 
              <PriceText 
                price="-"
                priceChangePercent={formatPriceChangePercent(0)} 
                negative={false}
              />
            }
            {quoteData && (!isEmpty) && 
              <PriceText 
                price={formatPrice(quoteData.price)} 
                priceChangePercent={formatPriceChangePercent(quoteData.priceChangePercent)} 
                negative={isNegative(quoteData.priceChangePercent)}
              />}
          </div>
          <div className="hover:cursor-pointer hover:opacity-80" onClick={deletePortfolioModal.onOpen}>
            <Text 
              className="flex items-center font-normal text-base font-variant-numeric: tabular-nums w-auto sm:w-[200px]"
              backgroundColor={twColors.highlight}
              marginBottom="12px" 
              padding="6px 12px" 
              height={42}
              justifyContent="center"
              style={{ 
                borderRadius: "8px",
              }}
            >
              <MdOutlineDelete color="white" size={22} />
              <Box className="text-white text-[16px] font-semilight hidden sm:block" margin="0 12px">
                Delete Portfolio
              </Box>
            </Text>
          </div>
        </div>

        {isEmpty
          ? 
            <Box 
              className="
                flex h-60 p-4 rounded-2xl bg-primary justify-center items-center 
                text-text text-md text-center
              "
              marginTop={16}
            >
              Your portfolio is empty. <br />
              Add a transaction to get started.
            </Box>
          : 
            <>
              <ContentLayout>
                <Card padding={"1rem 0 1rem 0"} backgroundColor={twColors.primary}>
                  {quoteData && 
                  <InfoTable data={quoteData}/>}
                </Card>

                <Card backgroundColor={twColors.primary}>
                  {chartData == null 
                    ? "Loading..."
                    : <LineChart 
                        data={chartData}
                        lineColor={twColors.tickUp}
                        height={360}
                        setValue={setWidgetLabel}
                        topLeft={<Widget data={widgetLabel} />}
                        topRight={<RangeSelector setRange={setRange} setInterval={setInterval} activeRange={range} activeInterval={interval} />}
                      />
                  }
                </Card>
              </ContentLayout>
              
              <div className="mt-4">
                <SummaryTable portfolioDatas={[]} />
              </div>
            </>
        }
        
        <Label mt="32px" ml="16px" mb="16px" color="white" fontSize={24}>Transactions</Label>
        <AddTransactionForm portfolioId={portfolioId} onSuccess={refreshTransactions} />
        <TransactionTable transactions={transactions} refresh={refreshTransactions} />
      </AutoColumn>
    </Card>
   );
}
 
export default PortfolioPage;