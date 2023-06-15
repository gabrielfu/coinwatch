import { twColors } from "@/app/twConfig";
import { AutoColumn } from "../Column";
import { Label } from "../Text";
import { useEffect, useState } from "react";
import { Box } from "rebass";
import { DatePicker } from "@mui/x-date-pickers"
import { TextField } from "@mui/material";
import { IoMdAddCircleOutline } from "react-icons/io";
import Dropdown from "@/app/inputs/Dropdown";
import { getTokenDatas } from "@/app/actions/tokens";
import dayjs from "dayjs";


const FormLayout = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid gap-4
      
        max-lg:auto-cols-min
        max-lg:grid-cols-[1fr]

        lg:grid-cols-[repeat(6,1fr)]
      "
    >
      {props.children}
    </div>
   );
}


const AddTransactionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(dayjs(new Date()));
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

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

  const onSubmit = () => {
    console.log({
      date, token, type, quantity, price
    });
  }

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
          <FormLayout>
            <DatePicker 
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              format="YYYY-MM-DD"
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
                desktopPaper: {
                  style: {
                    backgroundColor: twColors.primary,
                    color: "white",
                  },
                },
              }}
            />
            <Dropdown value={token} setValue={setToken} label="Token" itemValues={tokenList} />
            <Dropdown value={type} setValue={setType} label="Type" itemValues={["BUY", "SELL"]} />
            <TextField size="small" type="number" onWheel={(e) => e.target.blur()} value={quantity} label="Quantity" sx={sx} inputProps={ip} />
            <TextField size="small" type="number" onWheel={(e) => e.target.blur()} value={price} label="Average Price" sx={sx} inputProps={ip} />

            <div className="hover:cursor-pointer" onClick={onSubmit}>
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
          </FormLayout>
        }
      </AutoColumn>
    </Box>
  );
}

export default AddTransactionForm;