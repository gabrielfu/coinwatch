import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { twColors } from "../twConfig";

const Dropdown = ({
  value,
  setValue,
  label,
  itemValues,
  itemLabels,
}: {
  value: any;
  setValue: (value: any) => void;
  label: string; 
  itemValues: any[];
  itemLabels?: string[];
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return ( 
    <FormControl fullWidth size="small" >
      <InputLabel 
        sx={{
          color: twColors.text,
          "&.MuiInputLabel-shrink": {
            color: twColors.text
          },
          "&.Mui-focused": {
            color: "white"
          }
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        sx={{          
          color: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: twColors.text
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
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