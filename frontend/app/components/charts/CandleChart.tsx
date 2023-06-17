'use client';

import React from 'react';
import { IChartApi, OhlcData } from 'lightweight-charts';
import { twColors } from '@/app/twConfig';
import Chart, { BaseChartProps } from './Chart';


const CandleChart = (props: BaseChartProps<OhlcData>) => {
  const candleRed = twColors.tickDown;
  const candleGreen = twColors.tickUp;

  const addSeriesCallback = (chart: IChartApi) => {
    return chart.addCandlestickSeries({
      upColor: candleGreen,
      downColor: candleRed,
      borderDownColor: candleRed,
      borderUpColor: candleGreen,
      wickDownColor: candleRed,
      wickUpColor: candleGreen,
    });
  }

  return ( 
    <Chart<OhlcData, "Candlestick"> 
      addSeriesCallback={addSeriesCallback}
      {...props}
    />
   );
}
 
export default CandleChart;
