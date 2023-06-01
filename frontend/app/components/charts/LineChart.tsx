'use client';

import React from 'react';
import { IChartApi, LineData } from 'lightweight-charts';
import { twColors } from '@/app/twConfig';
import Chart, { BaseChartProps } from './Chart';

type LineChartProps = {
  lineColor?: string
} & BaseChartProps<LineData>;

const LineChart = ({
  lineColor = twColors.gray,
  ...props
}: LineChartProps) => {
  const addSeriesCallback = (chart: IChartApi) => {
    return chart.addLineSeries({
      color: lineColor,
    });
  }

  return ( 
    <Chart<LineData, "Line"> 
      addSeriesCallback={addSeriesCallback}
      {...props}
    />
   );
}
 
export default LineChart;
