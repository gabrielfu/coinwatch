import { BiSearch } from 'react-icons/bi';
import { Label } from "../Text";
import { twColors } from "@/app/twConfig";
import { Input } from "@rebass/forms";

const TokenSearch = () => {
  return ( 
    <Label backgroundColor="transparent" color={twColors.gmx.gray} padding="4px 12px" width={300} 
      type="text"
      justifyContent="space-between"
      style={{ 
        borderRadius: "8px", 
        borderWidth: "2px", 
        borderColor: twColors.gmx.gray
      }}>
      <Input 
        className="focus:outline-none"
        name="token" placeholder="Search tokens" 
        color={twColors.gmx.text} margin="0 4px" padding="0" width={300} height={36} backgroundColor="transparent" 
        style={{borderWidth: 0, border: 0, borderRadius: 0}}
      />
      <BiSearch size={24} />
    </Label>
   );
}
 
export default TokenSearch;
