import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { twColors } from "../twConfig";

const Dropdown = ({
  value,
  setValue,
  label,
  itemValues,
  itemLabels,
  disabled = false,
}: {
  value: any;
  setValue: (value: any) => void;
  label: string; 
  itemValues: any[];
  itemLabels?: string[];
  disabled?: boolean;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return ( 
    <FormControl fullWidth size="small" >
      <InputLabel 
        disabled={disabled}
        sx={{
          color: twColors.text,
          "&.MuiInputLabel-shrink": {
            color: twColors.text
          },
          "&.Mui-focused": {
            color: "white"
          },
          "&.Mui-disabled" : {
            color: twColors.disabledText,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        disabled={disabled}
        sx={{          
          color: "white",
          ".MuiSelect-icon": {
            color: twColors.text
          },
          ".MuiSelect-iconOpen": {
            color: "white"
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: twColors.text
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: twColors.text
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: twColors.disabledText
          },
          "&.Mui-disabled .MuiSelect-icon": {
            color: twColors.disabledText
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                minWidth: 180,
                backgroundColor: twColors.primary,
                color: "white",
              }
            }
          }
        }}
      >
        {itemValues.map((v, i) => {
          const l = itemLabels ? itemLabels[i] : v;
          return <MenuItem key={i} value={v}>{l}</MenuItem>
        })}
      </Select>
    </FormControl>
   );
}
 
export default Dropdown;