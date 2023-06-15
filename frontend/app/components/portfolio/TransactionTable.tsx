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
  const formattedData = {
    date: data.date,
    token: data.token.symbol,
    type: data.type,
    quantity: formatPrice(data.quantity, false),
    price: formatPrice(data.price),
    costBasis: formatPrice(data.quantity * data.price),
  };

  return ( 
    <>
      <div className="no-underline hover:opacity-70">
        <ResponsiveGrid>
          <Label color='white'>{formattedData.date}</Label>
          <Label color='white'>{formattedData.token}</Label>
          <Label color='white'>{formattedData.type}</Label>
          <Label color='white' end={1}>{formattedData.quantity}</Label>
          <Label color='white' end={1}>{formattedData.price}</Label>
          <Label color='white' end={1}>{formattedData.costBasis}</Label>
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