import { twColors } from "@/app/twConfig";
import Card from "../Card";
import { Label } from "../Text";

const RangeSelector = () => {
  return ( 
    <Label backgroundColor="transparent" color={twColors.gmx.text}
      type="text"
      justifyContent="space-between"
      style={{ 
        borderRadius: "8px", 
        borderWidth: "2px", 
        borderColor: twColors.gmx.text
      }}>
      <Label className="border-r-2 border-gmx-text py-1 px-3">
        1D
      </Label>
      <Label className="border-r-2 border-gmx-text py-1 px-3">
        5D
      </Label>
      <Label className="py-1 px-3">
        1M
      </Label>
    </Label>
   );
}
 
export default RangeSelector;