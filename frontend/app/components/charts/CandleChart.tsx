'use client';

import React, { useRef, useState, useEffect, useCallback, Dispatch, SetStateAction, ReactNode } from 'react';
import { createChart, IChartApi, ISeriesApi, ColorType, CrosshairMode, MouseEventHandler, MouseEventParams, OhlcData } from 'lightweight-charts';
import { RowBetween } from '../Row';
import Card from '../Card';
import styled from 'styled-components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { twColors } from '@/app/twConfig';

dayjs.extend(utc);

const DEFAULT_HEIGHT = 300;
const lineColor = 'rgba(35, 38, 59, 1.0)';
const candleRed = twColors.red;
const candleGreen = twColors.green;
const textColor = twColors.gmx.text;

const Wrapper = styled(Card)`
  width: 100%;
  padding: 1rem;
  display: flex;
  background-color: "transparent";
  flex-direction: column;
  > * {
    font-size: 1rem;
  }
`

type LineChartProps = {
  data: OhlcData[]
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for value label on hover
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>;

const CandleChart = ({
  data,
  setValue,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  height = DEFAULT_HEIGHT,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartCreated, setChart] = useState<IChartApi | undefined>();
  const [series, setSeries] = useState<ISeriesApi<"Candlestick"> | undefined>();
  const crosshairMoveHandlerRef = useRef<MouseEventHandler | null>(null);

  const handleResize = useCallback(() => {
    if (chartCreated && chartRef?.current?.parentElement) {
      chartCreated.resize(chartRef.current.parentElement.clientWidth - 32, height);
      chartCreated.timeScale().fitContent();
      chartCreated.timeScale().scrollToPosition(0, false);
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
          borderColor: lineColor,
          timeVisible: true,
        },
        watermark: {
          visible: false,
        },
        grid: {
          vertLines: {
            color: lineColor,
            visible: false,
          },
          horzLines: {
            color: lineColor,
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

      const candleSeries = chart.addCandlestickSeries({
        upColor: candleGreen,
        downColor: candleRed,
        borderDownColor: candleRed,
        borderUpColor: candleGreen,
        wickDownColor: candleRed,
        wickUpColor: candleGreen,
      });

      setChart(chart);
      setSeries(candleSeries);
    }
  }, [chartCreated, height, setValue]);

  useEffect(() => {
    if (chartCreated && series && data) {
      series.setData(data);

      // update the title when hovering on the chart
      if (crosshairMoveHandlerRef.current) {
        chartCreated.unsubscribeCrosshairMove(crosshairMoveHandlerRef.current);
      }
      crosshairMoveHandlerRef.current = (param: MouseEventParams) => {
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
        } else if (series && param) {
          const timestamp = param.time as number;
          const time = dayjs.unix(timestamp).utc().format('DD MMM YYYY h:mm A') + ' (UTC)';
          const parsed = param.seriesData.get(series) as { open: number } | undefined;
          setValue && setValue(parsed?.open);
          setLabel && setLabel(time);
        }
      }
      chartCreated.subscribeCrosshairMove(crosshairMoveHandlerRef.current);
    }
  }, [chartCreated, data, series, height, setValue, setLabel]);

  return (
    <Wrapper minHeight={minHeight}>
      <RowBetween>
        {topLeft ?? null}
        {topRight ?? null}
      </RowBetween>
      <div ref={chartRef} id={'candle-chart'} {...rest} />
      <RowBetween>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </RowBetween>
    </Wrapper>
  );
}

export default CandleChart;
