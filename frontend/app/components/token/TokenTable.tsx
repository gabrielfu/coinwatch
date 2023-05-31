'use client';

import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { RowFixed } from "../Row";
import { Label, ClickableText, Percent } from "../Text";
import { twColors } from '@/app/twConfig';
import { TokenData } from "@/app/actions/tokens";
import TokenLogo from "./TokenLogo";
import { Break, PageButtons, LastRow } from "@/app/components/Table";
import { formatPrice, formatPriceChangePercent, formatDollarAmount, isNegative } from "../util/format";

const ResponsiveGrid = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid items-center mx-4 gap-4

        max-sm:grid-cols-[repeat(2,1fr)]
        max-sm:[&>*:first-child]:hidden
        max-sm:[&>*:nth-child(4)]:hidden
        max-sm:[&>*:nth-child(5)]:hidden
        max-sm:[&>*:nth-child(6)]:hidden

        sm:max-screen800:grid-cols-[20px_1.5fr_repeat(2,1fr)]
        sm:max-screen800:[&>*:nth-child(5)]:hidden
        sm:max-screen800:[&>*:nth-child(6)]:hidden

        screen800:max-screen900:grid-cols-[20px_1.5fr_repeat(3,1fr)]
        screen800:max-screen900:[&>*:nth-child(5)]:hidden

        screen900:grid-cols-[20px_3fr_repeat(4,1fr)]
      "
    >
      {props.children}
    </div>
   );
}

const ExtraSmallOnly = (props: React.PropsWithChildren & { style: React.CSSProperties; }) => {
  return (
    <span className="block sm:hidden" {...props} />
  )
}


const HideExtraSmall = (props: React.PropsWithChildren & { style: React.CSSProperties; }) => {
  return (
    <span className="hidden sm:block" {...props} />
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
      priceChangePercent: tokenData.priceChangePercent == null ? "-" : formatPriceChangePercent(tokenData.priceChangePercent),
      negative: isNegative(tokenData.priceChangePercent),
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
                <Label ml="8px" color={twColors.text}>
                  ({formattedData.symbol})
                </Label>
              </RowFixed>
            </HideExtraSmall>
          </Label>
          <Label color='white' end={1}>{formattedData.price}</Label>
          <Percent negative={formattedData.negative} end={1}>{formattedData.priceChangePercent}</Percent>
          <Label color='white' end={1}>{formattedData.volume}</Label>
          <Label color='white' end={1}>{formattedData.marketCap}</Label>
        </ResponsiveGrid>
      </Link>
      <Break />
    </>
   );
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
    <Card backgroundColor={twColors.primary}>
      <AutoColumn gap="16px" margin="0.25em 0 0.25em 0">
        <ResponsiveGrid>
          <Label color={twColors.text}>#</Label>
          <ClickableText color={twColors.text} onClick={() => handleSort("name")}>
            Name
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("price")}>
            Price
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("priceChange")}>
            Price Chg %
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("volume")}>
            Volume 24H
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("marketCap")}>
            Market Cap
          </ClickableText>
        </ResponsiveGrid>
        <Break />

        {sortedTokens.length > 0 
          ? <>
            {sortedTokens.map((data, i) => {
              return data 
                ? <DataRow key={i} tokenData={data} index={(page - 1) * itemsPerPage + i} />
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
