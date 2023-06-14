import { twColors } from "@/app/twConfig";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { ClickableText, Label, Percent } from "../Text";
import { Break, LastRow, PageButtons } from "../Table";
import Link from "next/link";
import { formatDollarAmount, formatPrice, formatPriceChangePercent, isNegative } from "../util/format";
import { useEffect, useState } from "react";
import { PortfolioData } from "@/app/actions/portfolios";
import { Box } from "rebass";
import { DatePicker } from "@mui/x-date-pickers"
import { TextField } from "@mui/material";
import { IoMdAddCircleOutline } from "react-icons/io";
import Dropdown from "@/app/inputs/Dropdown";
import { getTokenDatas } from "@/app/actions/tokens";

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
  const [date, setDate] = useState();
  const [token, setToken] = useState();
  const [type, setType] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const [tokenList, setTokenList] = useState<string[]>([]);

  const sx = {
    "& label": {
      color: twColors.text,
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "white",
        borderColor: twColors.text
      },
      "&:hover fieldset": {
        borderColor: twColors.text
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  };
  const ip = { style: { color: "white" } };

  useEffect(() => {
    getTokenDatas()
      .then(data => {
        setTokenList(data.map(d => d.symbol).sort())
      });
  }, []);

  return (
    <Box className="bg-tertiary w-full rounded-2xl px-8 pb-4 pt-4 text-white">
      <AutoColumn gap="8px">
        <Label className="hover:cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          {"Add Transaction " + (isOpen ? "▲" : "▼")}
        </Label>
        {isOpen && 
          <ResponsiveGrid>
            <DatePicker 
              label="Date"
              slotProps={{ 
                textField: { 
                  size: "small",
                  sx: sx,
                  inputProps: ip,
                },
                openPickerButton: {
                  style: {
                    color: twColors.text,
                  },
                },
                popper: {
                  style: {
                    backgroundColor: "black"
                  }
                }
              }}
            />
            <Dropdown value={token} setValue={setToken} label="Token" itemValues={tokenList} />
            <Dropdown value={type} setValue={setType} label="Type" itemValues={["BUY", "SELL"]} />
            <TextField size="small" type="number" onWheel={(e) => e.target.blur()} value={quantity} label="Quantity" sx={sx} inputProps={ip} />
            <TextField size="small" type="number" onWheel={(e) => e.target.blur()} value={price} label="Average Price" sx={sx} inputProps={ip} />

            <div className="hover:cursor-pointer" onClick={() => {}}>
                <Label backgroundColor={twColors.primary}
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