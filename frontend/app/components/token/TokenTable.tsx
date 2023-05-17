'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { BaseProps } from "rebass";
import numbro from 'numbro';
import Card from "../Card";
import { AutoColumn } from "../Column";
import { RowFixed } from "../Row";
import { Label, ClickableText, Percent } from "../Text";
import { twColors } from '@/app/twConfig';
import { TokenData } from "@/dummy-data/all-tokens";
import TokenLogo from "./TokenLogo";


const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;

  grid-template-columns: 20px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(3, 1fr);
    & :nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 20px 1.5fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 724px) {
    grid-template-columns: repeat(2, 1fr);
    > *:first-child {
      display: none;
    }
    & :nth-child(4) {
      display: none;
    }
    & *:nth-child(5) {
      display: none;
    }
  }
`

const PageArrow = ({ disabled, left, onClick }: {disabled?: boolean, left: boolean, onClick?: () => void}) => {
  return (
    <div className={"pt-0 pb-0 pl-5 pr-5 select-none hover:cursor-pointer " + (disabled ? "opacity-40" : "opacity-100")} onClick={onClick}>
      {left ? "◀" : "▶"}
    </div>
  )
}

const LastRow = ({ children }) => {
  return (
    <div className="text-gmx-text w-full flex justify-center items-center content-center mt-1 mb-2">
      {children}
    </div>
  )
}

const PageButtons = ({ page, setPage, maxPage }: { page: number, setPage, maxPage: number }) => {
  return (
    <LastRow>
      <PageArrow left={true} disabled={page == 1} onClick={() => {page == 1 ? null : setPage((p: number) => p - 1)}} />
        {`Page ${page} / ${maxPage}`}
      <PageArrow left={false} disabled={page == maxPage} onClick={() => {page == maxPage ? null : setPage((p: number) => p + 1)}} />
    </LastRow>
  )
}

const Break = () => {
  return ( 
    <div className="h-px w-full bg-gmx-break" />
   );
}


const ExtraSmallOnly = (props: BaseProps) => {
  return (
    <span className="hidden tosm:block" {...props} />
  )
}


const HideExtraSmall = (props: BaseProps) => {
  return (
    <span className="tosm:hidden" {...props} />
  )
}


const DataRow = ({
  tokenData, 
  index,
}: {
  tokenData: TokenData,
  index: number,
}) => {
  const formattedData = {
      name: tokenData.name,
      symbol: tokenData.symbol,
      price: tokenData.price == null ? "-" : formatPrice(tokenData.price),
      priceChange: tokenData.priceChange == null ? "-" : formatPriceChange(tokenData.priceChange),
      negative: tokenData.priceChange < 0,
      volume: tokenData.volume == null ? "-" : formatDollarAmount(tokenData.volume),
      marketCap: tokenData.marketCap == null ? "-" : formatDollarAmount(tokenData.marketCap),
      logo: tokenData.logo,
    };

  return ( 
    <>
      <Link href={`/tokens/${tokenData.symbol}`} className="no-underline hover:cursor-pointer hover:opacity-70">
        <ResponsiveGrid>
          <Label color='white'>{index + 1}</Label>
          <Label color='white'>
            <RowFixed>
              <TokenLogo src={formattedData.logo} alt={formattedData.name} size={24} />
            </RowFixed>
            <ExtraSmallOnly style={{ marginLeft: '6px' }}>
                <Label ml="8px">
                  {formattedData.symbol}
                </Label>
            </ExtraSmallOnly>
            <HideExtraSmall style={{ marginLeft: '10px' }}>
              <RowFixed>
                <Label>
                  {formattedData.name}
                </Label>
                <Label ml="8px" color={twColors.gmx.text}>
                  ({formattedData.symbol})
                </Label>
              </RowFixed>
            </HideExtraSmall>
          </Label>
          <Label color='white' end={1}>{formattedData.price}</Label>
          <Percent negative={formattedData.negative} end={1}>{formattedData.priceChange}</Percent>
          <Label color='white' end={1}>{formattedData.volume}</Label>
          <Label color='white' end={1}>{formattedData.marketCap}</Label>
        </ResponsiveGrid>
      </Link>
      <Break />
    </>
   );
} 


const formatPrice = (x: number) => {
  return "$" + (x >= 10 ? x.toLocaleString("en-US", { 
    maximumFractionDigits: 2, 
    minimumFractionDigits: 2, 
  }) : x.toLocaleString("en-US", { 
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 3,
  }));
}

const formatPriceChange = (x: number) => {
  const y = Math.round(x * 100) / 100;
  const arrow = y > 0 ? '▲ ' : (y < 0 ? '▼ ': '');
  return arrow + Math.abs(y).toFixed(2) + "%"
}

const formatDollarAmount = (num: number | undefined, digits = 2, round = true) => {
  if (num === 0) return '$0.00'
  if (!num) return '-'
  if (num < 0.001 && digits <= 3) {
    return '<$0.001'
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  })
}

const TokenTable = ({ tokenDatas }: {tokenDatas: TokenData[]}) => {
  // sorting
  const [sortField, setSortField] = useState<keyof TokenData>("marketCap");
  const [sortDescending, setSortDescending] = useState(1);

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setMaxPage(
      Math.floor(tokenDatas.length / itemsPerPage) + (tokenDatas.length % itemsPerPage > 0 ? 1 : 0)
    );
  }, [itemsPerPage, tokenDatas]);

  const sortedTokens = useMemo(() => {
    return tokenDatas
      .sort((a, b) => {
        return (b[sortField] > a[sortField] ? 1 : -1) * sortDescending
      })
      .slice(
        itemsPerPage * (page - 1), itemsPerPage * page
      )
  }, [tokenDatas, sortField, sortDescending, itemsPerPage, page]);

  const handleSort = useCallback(
    (newField: keyof TokenData) => {
      setSortDescending(old => { return sortField == newField ? old * -1 : 1});
      setSortField(newField);
    },
    [sortField]
  );

  return ( 
    <Card backgroundColor={twColors.gmx.light}>
      <AutoColumn gap="16px" margin="0.25em 0 0.25em 0">
        <ResponsiveGrid>
          <Label color={twColors.gmx.text}>#</Label>
          <ClickableText color={twColors.gmx.text} onClick={() => handleSort("name")}>
            Name
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("price")}>
            Price
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("priceChange")}>
            PriceChange
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("volume")}>
            Volume 24H
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("marketCap")}>
            Market Cap
          </ClickableText>
        </ResponsiveGrid>
        <Break />

        {sortedTokens.length > 0 
          ? <>
            {sortedTokens.map((data, i) => {
              return data 
                ? <DataRow tokenData={data} index={i} />
                : null;
            })}
            <PageButtons page={page} setPage={setPage} maxPage={maxPage} />
          </>
          : <LastRow>
            No Data
          </LastRow>
        }
      </AutoColumn>
    </Card>
   );
}
 
export default TokenTable;
