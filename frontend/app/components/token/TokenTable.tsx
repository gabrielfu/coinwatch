'use client';

import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BaseProps } from "rebass";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { RowFixed } from "../Row";
import { Label, ClickableText, Percent } from "../Text";
import { twColors } from '@/app/twConfig';
import { TokenData } from "@/dummy-data/all-tokens";
import TokenLogo from "./TokenLogo";
import { formatPrice, formatPriceChange, formatDollarAmount, isNegative } from "../util/format";

const ResponsiveGrid = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
      grid items-center mx-4 gap-4

      max-screen679:grid-cols-[repeat(2,1fr)]
      max-screen679:[&>*:first-child]:hidden
      max-screen679:[&>*:nth-child(4)]:hidden
      max-screen679:[&>*:nth-child(5)]:hidden
      max-screen679:[&>*:nth-child(6)]:hidden

      screen679:max-screen800:grid-cols-[20px_1.5fr_repeat(2,1fr)]
      screen679:max-screen800:[&>*:nth-child(5)]:hidden
      screen679:max-screen800:[&>*:nth-child(6)]:hidden

      screen800:max-screen900:grid-cols-[20px_1.5fr_repeat(3,1fr)]
      screen800:max-screen900:[&>*:nth-child(5)]:hidden

      screen900:grid-cols-[20px_3fr_repeat(4,1fr)]
      "
    >
      {props.children}
    </div>
   );
}

const PageArrow = ({ disabled, left, onClick }: {disabled?: boolean, left: boolean, onClick?: () => void}) => {
  return (
    <div className={"pt-0 pb-0 pl-5 pr-5 select-none hover:cursor-pointer " + (disabled ? "opacity-40" : "opacity-100")} onClick={onClick}>
      {left ? "◀" : "▶"}
    </div>
  )
}

const LastRow = (props: React.PropsWithChildren) => {
  return (
    <div className="text-gmx-text w-full flex justify-center items-center content-center mt-1 mb-2">
      {props.children}
    </div>
  )
}

const PageButtons = ({ page, setPage, maxPage }: { page: number, setPage: (value: SetStateAction<number>) => void, maxPage: number }) => {
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
    <span className="block sm:hidden" {...props} />
  )
}


const HideExtraSmall = (props: BaseProps) => {
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
      priceChange: tokenData.priceChange == null ? "-" : formatPriceChange(tokenData.priceChange),
      negative: isNegative(tokenData.priceChange),
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
