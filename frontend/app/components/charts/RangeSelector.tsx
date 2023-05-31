import { Label } from "../Text";
import { Text } from 'rebass';

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
    <Text 
      className={"py-0 px-3 hover:cursor-pointer " + (isActive && "text-white")} 
      onClick={() => {
        setRange(range);
        setInterval(interval);
      }}
    >
      {text}
    </Text>
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
    <Text 
      className="
        flex items-center justify-between font-normal text-base 
        bg-tertiary text-text rounded-lg h-9 
        w-full px-4
        screen800:w-auto screen800:px-2"
      type="text"
    >
      <RangeOption text="1D" range="24h" interval="15m" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="5D" range="5d" interval="1h" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="1M" range="1mo" interval="1h" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="6M" range="6mo" interval="1d" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="1Y" range="1y" interval="1d" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
      <RangeOption text="5Y" range="5y" interval="1wk" setRange={setRange} setInterval={setInterval} activeRange={activeRange} activeInterval={activeInterval} />
    </Text>
   );
}
 
export default RangeSelector;