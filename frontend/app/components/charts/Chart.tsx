'use client';

import React, { useRef, useState, useEffect, useCallback, Dispatch, SetStateAction, ReactNode } from 'react';
import { createChart, IChartApi, ISeriesApi, ColorType, CrosshairMode, MouseEventParams, OhlcData, SeriesOptionsMap, SingleValueData, SeriesType } from 'lightweight-charts';
import { RowBetween } from '../Row';
import Card from '../Card';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { twColors } from '@/app/twConfig';

dayjs.extend(utc);

const DEFAULT_HEIGHT = 300;
const gridColor = 'rgba(35, 38, 59, 1.0)';
const textColor = twColors.text;

export type ChartData = OhlcData | SingleValueData;

export type BaseChartProps<T extends ChartData> = {
  data: T[]
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<T | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for value label on hover
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>;

type DispatcherChartProps<DT extends ChartData, ST extends SeriesType> = {
  seriesType: ST
  addSeriesCallback: AddSeriesCallback<ST>
} & BaseChartProps<DT>;

export type AddSeriesCallback<T extends SeriesType> = (chart: IChartApi) => ISeriesApi<T>;

function Chart<DT extends ChartData, ST extends SeriesType> ({
  data,
  seriesType,
  addSeriesCallback,
  setValue,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  height = DEFAULT_HEIGHT,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: DispatcherChartProps<DT, ST>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartCreated, setChart] = useState<IChartApi | undefined>();
  const [series, setSeries] = useState<ISeriesApi<typeof seriesType> | undefined>();

  const handleResize = useCallback(() => {
    if (chartCreated && chartRef?.current?.parentElement) {
      chartCreated.resize(chartRef.current.parentElement.clientWidth - 32, height);
      chartCreated.timeScale().fitContent();
      chartCreated.timeScale().scrollToPosition(0, false);
      chartCreated.priceScale("right").applyOptions({ autoScale: true });
    }
  }, [chartCreated, chartRef, height]);

  // add event listener for resize
  const isClient = typeof window === 'object'
  useEffect(() => {
    if (!isClient) {
      return;
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, chartRef, handleResize]); // Empty array ensures that effect is only run on mount and unmount

  // if chart not instantiated in canvas, create it
  useEffect(() => {
    if (!chartCreated && !!chartRef?.current?.parentElement) {
      const chart: IChartApi = createChart(chartRef.current, {
        height: height,
        width: chartRef.current.parentElement.clientWidth - 32,
        layout: {
          background: {
            type: ColorType.Solid,
            color: 'transparent',
          },
          textColor: textColor,
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderColor: gridColor,
          timeVisible: true,
        },
        watermark: {
          visible: false,
        },
        grid: {
          vertLines: {
            color: gridColor,
            visible: false,
          },
          horzLines: {
            color: gridColor,
            visible: false,
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });

      chart.timeScale().fitContent();
      chart.priceScale('right').applyOptions({
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      })

      let newSeries: ISeriesApi<typeof seriesType> = addSeriesCallback(chart);

      chart.subscribeCrosshairMove((param: MouseEventParams) => {
        if (
          chartRef?.current &&
          (param === undefined ||
            param.time === undefined ||
            (param && param.point && param.point.x < 0) ||
            (param && param.point && param.point.x > chartRef.current.clientWidth) ||
            (param && param.point && param.point.y < 0) ||
            (param && param.point && param.point.y > height))
        ) {
          // reset values
          setValue && setValue(undefined);
          setLabel && setLabel(undefined);
        } else if (newSeries && param) {
          const timestamp = param.time as number;
          const time = dayjs.unix(timestamp).utc().format('DD MMM YYYY h:mm A') + ' (UTC)';
          const seriesData = param.seriesData.get(newSeries) as (DT | undefined);
          setValue && setValue(seriesData);
          setLabel && setLabel(time);
        }
      });

      setChart(chart);
      setSeries(newSeries);
    }
  }, [chartCreated, height, seriesType, setValue, setLabel, addSeriesCallback]);

  useEffect(() => {
    if (chartCreated && series && data) {
      series.setData(data);
      chartCreated.timeScale().fitContent();
      chartCreated.timeScale().scrollToPosition(0, false);
      chartCreated.priceScale("right").applyOptions({ autoScale: true });
    }
  }, [chartCreated, series, data]);

  return (
    <Card className="w-full p-4 flex rounded-2xl bg-transparent flex-col"  minHeight={minHeight}>
      <div className="hidden screen800:block">
        <RowBetween marginBottom={16}>
          {topLeft ?? null}
          {topRight ?? null}
        </RowBetween>
      </div>
      <div className="screen800:hidden flex flex-col justify-start">
        {topRight ?? null}
        {topLeft ?? null}
      </div>
      <div ref={chartRef} id={'candle-chart'} {...rest} />
      <RowBetween>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </RowBetween>
    </Card>
  );
}

export default Chart;
