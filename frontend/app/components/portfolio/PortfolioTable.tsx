import { twColors } from "@/app/twConfig";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { ClickableText, Label, Percent } from "../Text";
import { Break, LastRow, PageButtons } from "../Table";
import Link from "next/link";
import { formatDollarAmount, formatPrice, formatPriceChangePercent, isNegative } from "../util/format";
import { useState } from "react";


const ResponsiveGrid = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid items-center mx-4 gap-4

        max-md:grid-cols-[repeat(3,1fr)]
        max-md:[&>*:first-child]:hidden
        max-md:[&>*:nth-child(4)]:hidden
        max-md:[&>*:nth-child(6)]:hidden
        max-md:[&>*:nth-child(7)]:hidden

        md:max-xl:grid-cols-[20px_1.5fr_repeat(3,1fr)]
        md:max-xl:[&>*:nth-child(4)]:hidden
        md:max-xl:[&>*:nth-child(6)]:hidden

        xl:grid-cols-[20px_2fr_repeat(5,1fr)]
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
  data: any,
  index: number,
}) => {
  data = {
    name: "p1",
    marketValue: 27201.53,
    dayChange: 679,
    dayChangePercent: 2.56,
    totalChange: 14201.50,
    totalChangePercent: 109.24,
  }
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
      <Link href={`/portfolios/${data.symbol}`} className="no-underline hover:cursor-pointer hover:opacity-70">
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


const PortfolioTable = () => {

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const handleSort = (x: any) => {}

  const datas = [1,2,3];

  return ( 
    <Card backgroundColor={twColors.gmx.light}>
      <AutoColumn gap="16px" margin="0.25em 0 0.25em 0">
        <ResponsiveGrid>
          <Label color={twColors.gmx.text}>#</Label>
          <ClickableText color={twColors.gmx.text} onClick={() => handleSort("name")}>
            Name
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("marketValue")}>
            Market Value
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("dayChange")}>
            Day Change
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("dayChangePercent")}>
            Day Change %
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("totalChange")}>
            Total Change
          </ClickableText>
          <ClickableText end={1} color={twColors.gmx.text} onClick={() => handleSort("totalChangePercent")}>
            Total Change %
          </ClickableText>
        </ResponsiveGrid>

        

        {datas.length > 0 
          ? <>
            {datas.map((data, i) => {
              return data 
                ? <DataRow key={i} index={(page - 1) * itemsPerPage + i} />
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
 
export default PortfolioTable;