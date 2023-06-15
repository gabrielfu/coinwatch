import { twColors } from "@/app/twConfig";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { ClickableText, Label, Percent } from "../Text";
import { Break, LastRow, PageButtons } from "../Table";
import Link from "next/link";
import { formatDollarAmount, formatPrice, formatPriceChangePercent, isNegative } from "../util/format";
import { useEffect, useState } from "react";
import { PortfolioData } from "@/app/actions/portfolios";
import { getTransactions, TransactionRequest, TransactionResponse } from "@/app/actions/transactions";

const ResponsiveGrid = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid items-center mx-4 gap-4

        max-md:grid-cols-[repeat(3,1fr)]
        max-md:[&>*:nth-child(4)]:hidden
        max-md:[&>*:nth-child(5)]:hidden
        max-md:[&>*:nth-child(6)]:hidden

        md:max-lg:grid-cols-[repeat(4,1fr)]
        md:max-lg:[&>*:nth-child(4)]:hidden
        md:max-lg:[&>*:nth-child(6)]:hidden

        lg:grid-cols-[repeat(6,1fr)]
      "
    >
      {props.children}
    </div>
   );
}

const DataRow = ({
  data, 
  index,
}: {
  data: TransactionResponse;
  index: number;
}) => {
  // const formattedData = {
  //   name: data.name,
  //   marketValue: data.marketValue == null ? "-" : formatPrice(data.marketValue),
  //   dayChange: data.marketValue == null ? "-" : formatPrice(data.dayChange),
  //   dayChangePercent: data.dayChangePercent == null ? "-" : formatPriceChangePercent(data.dayChangePercent),
  //   dayNegative: isNegative(data.dayChangePercent),
  //   totalChange: data.marketValue == null ? "-" : formatPrice(data.totalChange),
  //   totalChangePercent: data.totalChangePercent == null ? "-" : formatPriceChangePercent(data.totalChangePercent),
  //   totalNegative: isNegative(data.totalChangePercent),
  // };

  return ( 
    <>
      <div className="no-underline hover:opacity-70">
        <ResponsiveGrid>
          <Label color='white'>{data.date}</Label>
          <Label color='white'>{data.token.symbol}</Label>
          <Label color='white'>{data.type}</Label>
          <Label color='white' end={1}>{data.quantity}</Label>
          <Label color='white' end={1}>{data.price}</Label>
          <Label color='white' end={1}>{data.quantity * data.price}</Label>
        </ResponsiveGrid>
      </div>
      <Break />
    </>
   );
}

const TransactionTable = ({ transactions }: {
  transactions: TransactionResponse[];
}) => {

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const handleSort = (x: any) => {}

  return ( 
    <Card backgroundColor={twColors.primary}>
      <AutoColumn gap="16px" margin="0.25em 0 0.25em 0">
        <ResponsiveGrid>
          <ClickableText color={twColors.text} onClick={() => handleSort("date")}>
            Date
          </ClickableText>
          <ClickableText color={twColors.text} onClick={() => handleSort("token")}>
            Token
          </ClickableText>
          <ClickableText color={twColors.text} onClick={() => handleSort("type")}>
            Type
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("marketValue")}>
            Quantity
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("dayChange")}>
            Average Price
          </ClickableText>
          <ClickableText end={1} color={twColors.text} onClick={() => handleSort("totalChange")}>
            Cost Basis
          </ClickableText>
        </ResponsiveGrid>
        <Break />

        {transactions.length > 0 
          ? <>
            {transactions.map((data, i) => {
              return data 
                ? <DataRow key={i} data={data} index={(page - 1) * itemsPerPage + i} />
                : null;
            })}
            <PageButtons page={page} setPage={setPage} maxPage={maxPage} />
          </>
          : <LastRow>
            No Transactions
          </LastRow>
        }
      </AutoColumn>
    </Card>
   );
}
 
export default TransactionTable;