import { twColors } from "@/app/twConfig";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { ClickableText, Label, Percent } from "../Text";
import { Break, LastRow, PageButtons } from "../Table";
import Link from "next/link";
import { formatDollarAmount, formatPrice, formatPriceChangePercent, isNegative } from "../util/format";
import { useState } from "react";
import { PortfolioData, PortfolioInfo } from "@/app/actions/portfolios";
// import { Input } from "@rebass/forms";
import { Box, Button } from "rebass";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "../modals/Modal";


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
  data: PortfolioData;
  index: number;
}) => {
  const formattedData = {
    name: data.name,
    marketValue: data.marketValue == null ? "-" : formatPrice(data.marketValue),
    dayChange: data.marketValue == null ? "-" : formatPrice(data.dayChange),
    dayChangePercent: data.dayChangePercent == null ? "-" : formatPriceChangePercent(data.dayChangePercent),
    dayNegative: isNegative(data.dayChangePercent),
    totalChange: data.marketValue == null ? "-" : formatPrice(data.totalChange),
    totalChangePercent: data.totalChangePercent == null ? "-" : formatPriceChangePercent(data.totalChangePercent),
    totalNegative: isNegative(data.totalChangePercent),
  };

  return ( 
    <>
      <Link href={`/portfolios/${data.id}`} className="no-underline hover:cursor-pointer hover:opacity-70">
        <ResponsiveGrid>
          <Label color='white'>{index + 1}</Label>
          <Label color='white'>{formattedData.name}</Label>
          <Label color='white' end={1}>{formattedData.marketValue}</Label>
          <Label color='white' end={1}>{formattedData.dayChange}</Label>
          <Percent negative={formattedData.dayNegative} end={1}>{formattedData.dayChangePercent}</Percent>
          <Label color='white' end={1}>{formattedData.totalChange}</Label>
          <Percent negative={formattedData.totalNegative} end={1}>{formattedData.totalChangePercent}</Percent>
        </ResponsiveGrid>
      </Link>
      <Break />
    </>
   );
}


export const AddTransactionCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="bg-highlight w-full rounded-2xl px-8 pb-4 pt-4 text-white">
      <AutoColumn gap="8px">
        <Label className="hover:cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          {"Add Transaction " + (isOpen ? "▲" : "▼")}
        </Label>
        {isOpen && 
          <ResponsiveGrid>
            <Input bgColor="transparent" id="date" label="Date" register={() => {}} errors={() => {}} />
            <Input id="token" label="Token" register={() => {}} errors={() => {}} />
            <Input id="type" label="Type" register={() => {}} errors={() => {}} />
            <Input id="quantity" label="Quantity" register={() => {}} errors={() => {}} />
            <Input id="price" label="Average Price" register={() => {}} errors={() => {}} />

            <div className="hover:cursor-pointer" onClick={() => {}}>
                <Label backgroundColor={twColors.highlight}
                  padding="6px 12px" 
                  width={200}
                  height={42}
                  justifyContent="center"
                  style={{ 
                    borderRadius: "8px",
                  }}
                >
                  <IoMdAddCircleOutline color="white" size={22} />
                  <Box className="text-white text-[16px] font-semilight" margin="0 12px">
                    Add Transaction
                  </Box>
                </Label>
              </div>
          </ResponsiveGrid>
        }
      </AutoColumn>
    </Box>
  );
}


const TransactionTable = ({ portfolioDatas }: {
  portfolioDatas: PortfolioData[];
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

        {portfolioDatas.length > 0 
          ? <>
            {portfolioDatas.map((data, i) => {
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