import { twColors } from "@/app/twConfig";
import { Label } from "../Text";

const RangeButton = ({
  setRange,
  setInterval,
  range,
  interval,
  text,
  end=false
}: {
  setRange: (range: string) => void;
  setInterval: (interval: string) => void;
  range: string;
  interval: string;
  text: string;
  end?: boolean;
}) => {
  return ( 
    <Label 
      className={"py-1 px-3 hover:cursor-pointer " + (end ? "" : " border-r-2 border-gmx-text")} 
      onClick={() => {
        setRange(range);
        setInterval(interval);
      }}
    >
      {text}
    </Label>
   );
}

const RangeSelector = ({
  setRange,
  setInterval
}: {
  setRange: (range: string) => void;
  setInterval: (interval: string) => void;
}) => {
  return ( 
    <Label 
      backgroundColor="transparent" 
      color={twColors.gmx.text}
      type="text"
      justifyContent="space-between"
      marginBottom="16px"
      height={36}
      style={{ 
        borderRadius: "8px", 
        borderWidth: "2px", 
        borderColor: twColors.gmx.text
      }}>
        <RangeButton text="1D" range="24h" interval="15m" setRange={setRange} setInterval={setInterval} />
        <RangeButton text="5D" range="5d" interval="1h" setRange={setRange} setInterval={setInterval} />
        <RangeButton text="1M" range="1mo" interval="1h" setRange={setRange} setInterval={setInterval} />
        <RangeButton text="6M" range="6mo" interval="1d" setRange={setRange} setInterval={setInterval} />
        <RangeButton text="1Y" range="1y" interval="1d" setRange={setRange} setInterval={setInterval} />
        <RangeButton text="5Y" range="5y" interval="1wk" setRange={setRange} setInterval={setInterval} end />
    </Label>
   );
}
 
export default RangeSelector;