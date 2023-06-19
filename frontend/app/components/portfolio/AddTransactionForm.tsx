import { twColors } from "@/app/twConfig";
import { AutoColumn } from "../Column";
import { Label } from "../Text";
import { useEffect, useState } from "react";
import { Box } from "rebass";
import { DatePicker } from "@mui/x-date-pickers"
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { IoMdAddCircleOutline } from "react-icons/io";
import Dropdown from "@/app/inputs/Dropdown";
import { getTokenDatas } from "@/app/actions/tokens";
import dayjs, { Dayjs } from "dayjs";
import { createTransaction, TransactionRequest } from "@/app/actions/transactions";


const FormLayout = (props: React.PropsWithChildren) => {
  return (
    <div
      className="
        grid gap-4 mt-4
      
        max-lg:auto-cols-min
        max-lg:grid-cols-[1fr]

        lg:grid-cols-[repeat(6,1fr)]
      "
    >
      {props.children}
    </div>
   );
}


const AddTransactionForm = ({ 
  portfolioId,
  onSuccess = () => {},
 }: {
  portfolioId: string;
  onSuccess?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(dayjs(new Date()));
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const [valid, setValid] = useState(false);
  const [tokenList, setTokenList] = useState<string[]>([]);

  const [isCash, setIsCash] = useState(false);

  const sx = {
    "& label": {
      color: twColors.text,
      "&.Mui-disabled" : {
        color: twColors.disabledText,
      },
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: twColors.text
      },
      "&:hover fieldset": {
        borderColor: twColors.text
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      },
      "&.Mui-disabled fieldset" : {
        borderColor: twColors.disabledText
      },
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: twColors.disabledText
    },
  };
  const ip = { style: { color: "white" } };

  const onSubmit = () => {
    if (valid) {
      const t: TransactionRequest = {
        portfolioId: parseInt(portfolioId),
        tokenSymbol: isCash ? "CASH" : token,
        date: date.format("YYYY-MM-DD"),
        quantity: quantity,
        purchasePrice: isCash ? 1.0 : price,
        type: type,
      }
      createTransaction(t)
        .then(() => onSuccess());
    }
  }

  useEffect(() => {
    getTokenDatas()
      .then(data => {
        setTokenList(data.map(d => d.symbol).sort())
      });
  }, []);

  useEffect(() => {
    setValid(
      (date.isBefore(dayjs(new Date())))
      && (date.isAfter(dayjs("1970-01-01")))
      && (type != "")
      && (quantity > 0)
      && (isCash
        || ((token != "") && (price > 0))
      )
    )
  }, [date, token, type, quantity, price, isCash]);

  const onChange = (setValue: (value: any) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  }

  return (
    <Box className="bg-primary w-full rounded-2xl px-8 pb-4 pt-4 text-text">
      <AutoColumn gap="8px">
        <Label className="hover:cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          {"Add Transaction " + (isOpen ? "▲" : "▼")}
        </Label>
        {isOpen && 
          <>
          <FormLayout>
            <DatePicker 
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate as Dayjs)}
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
                  sx: {
                    svg: {
                      color: "white",
                    },
                    span: {
                      color: "white",
                    },
                    "& .MuiPickersDay-root": {
                      "&.Mui-selected": {
                        backgroundColor: twColors.highlight,
                      },
                    },
                    "& .MuiPickersDay-today": {
                      borderColor: "white",
                    }
                  }
                },
                mobilePaper: {
                  style: {
                    backgroundColor: twColors.primary,
                    color: "white",
                  },
                  sx: {
                    svg: {
                      color: "white",
                    },
                    span: {
                      color: "white",
                    },
                    "& .MuiPickersDay-root": {
                      "&.Mui-selected": {
                        backgroundColor: twColors.highlight,
                      },
                    },
                    "& .MuiPickersDay-today": {
                      borderColor: "white",
                    }
                  }
                },
                dialog: {
                  style: {
                    backgroundColor: twColors.primary,
                    color: "white",
                  },
                },
                switchViewButton: {
                  style: {
                    color: "white"
                  }
                },
                leftArrowIcon: {
                  style: {
                    color: "white"
                  }
                },
                rightArrowIcon: {
                  style: {
                    color: "white"
                  }
                },
                day: {
                  style: {
                    color: "white"
                  }
                },
              }}              
            />
            <Dropdown value={token} setValue={setToken} label={isCash ? "Cash" : "Token"} itemValues={tokenList} disabled={isCash} />
            <Dropdown value={type} setValue={setType} label="Type" itemValues={["BUY", "SELL"]} itemLabels={isCash ? ["DEPOSIT", "WITHDRAWAL"] : ["BUY", "SELL"]} />
            <TextField size="small" type="number" onWheel={(e) => e.target.blur()} 
              value={quantity} 
              onChange={onChange(setQuantity)} 
              label="Quantity" 
              sx={sx} 
              inputProps={ip}
            />
            <TextField size="small" type="number" onWheel={(e) => e.target.blur()} 
              value={isCash ? "1.00" : price} 
              onChange={onChange(setPrice)} 
              label="Average Price" 
              disabled={isCash} 
              sx={sx} 
              inputProps={ip} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className={isCash ? "text-disabledText" : "text-text"}>$</span>
                  </InputAdornment>
                )
              }}
            />

            <div className={valid ? "hover:cursor-pointer" : ""} onClick={onSubmit}>
                <Label backgroundColor={valid ? twColors.highlight : twColors.disabledText}
                  padding="6px 12px" 
                  width={200}
                  height={42}
                  justifyContent="center"
                  style={{ 
                    borderRadius: "8px",
                  }}
                >
                  <IoMdAddCircleOutline color={valid ? "white" : twColors.text} size={22} />
                  <Box 
                    className={"text-[16px] font-semilight " + (valid ? "text-white" : "text-text")} 
                    margin="0 12px"
                  >
                    Add Transaction
                  </Box>
                </Label>
              </div>
          </FormLayout>
          <FormControlLabel 
            control={
              <Checkbox 
                sx={{ color: twColors.text, '&.Mui-checked': { color: twColors.text }}} 
                checked={isCash}
                onChange={() => {
                  setIsCash(prev => !prev);
                  setToken("");
                  setType("");
                  setQuantity(0);
                  setPrice(0);
                }}
              />} 
            label="Cash Deposit / Withdrawal" 
          />
          </>
        }
      </AutoColumn>
    </Box>
  );
}

export default AddTransactionForm;