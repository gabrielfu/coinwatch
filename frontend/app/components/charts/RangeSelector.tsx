import { twColors } from "@/app/twConfig";
import { Label } from "../Text";

const RangeOption = ({
  setRange,
  setInterval,
  range,
  interval,
  text,
  activeRange,
  activeInterval,
}: {
  setRange: (range: string) => void;
  setInterval: (interval: string) => void;
  range: string;
  interval: string;
  text: string;
  activeRange: string;
  activeInterval: string;
}) => {
  const isActive = (range == activeRange) && (interval == activeInterval);

  return ( 
    <Label 
      className={"py-0 px-3 hover:cursor-pointer " + (isActive && "text-white")} 
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
  setInterval,
  activeRange,
  activeInterval,
}: {
  setRange: (range: string) => void;
  setInterval: (interval: string) => void;
  activeRange: string;
  activeInterval: string;
}) => {
  return ( 
    <Label 
      backgroundColor={twColors.tertiary} 
      color={twColors.text}
      type="text"
      justifyContent="space-between"
      marginBottom="16px"
      height={36}
      style={{ 
        borderRadius: "8px", 
      }}
    >
      <RangeOption text="1D" range="24h" interval="15m" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="5D" range="5d" interval="1h" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="1M" range="1mo" interval="1h" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="6M" range="6mo" interval="1d" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="1Y" range="1y" interval="1d" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="5Y" range="5y" interval="1wk" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
    </Label>
   );
}
 
export default RangeSelector;