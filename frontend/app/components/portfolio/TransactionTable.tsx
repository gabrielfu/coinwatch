import { useState } from "react";
import { twColors } from "@/app/twConfig";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { ClickableText, Label } from "../Text";
import { Break, LastRow, PageButtons } from "../Table";
import { formatPrice } from "../util/format";
import { TransactionResponse } from "@/app/actions/transactions";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const ResponsiveGrid = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid items-center mx-4 gap-4
        max-lg:grid-cols-[repeat(2,140px)_80px_100px_repeat(2,140px)_repeat(3,22px)]
        lg:grid-cols-[repeat(6,154px)_repeat(3,22px)]
        overflow-x-auto
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
          <div></div>
          <MdOutlineEdit color={twColors.text} size={22} />
          <MdOutlineDelete color={twColors.text} size={22} />
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
        <div className=" overflow-x-scroll scroll-smooth">
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
              <div></div>
              <div></div>
              <div></div>
            </ResponsiveGrid>
            <Break />

            {transactions.length > 0 
              ? <>
                {transactions.map((data, i) => {
                  return data 
                    ? <DataRow key={i} data={data} index={(page - 1) * itemsPerPage + i} />
                    : null;
                })}
              </>
              : null
            }
          </AutoColumn>
        </div>
        {transactions.length > 0 
          ? <PageButtons page={page} setPage={setPage} maxPage={maxPage} />
          : <LastRow>
            No Transactions
          </LastRow>
        }
      </AutoColumn>
    </Card>
   );
}
 
export default TransactionTable;