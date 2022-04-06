import { useQuery } from "react-query";
import { ohlcFetch } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

export interface IChartProps {
  coinId: string;
}
export interface IData {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function StickChart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    ohlcFetch(coinId)
  );
  //   console.log(
  //     data?.map((price) => [
  //       new Date(price.time_open), // 날짜
  //       price.open.toFixed(), // 시작가
  //       price.high.toFixed(), // 최고가
  //       price.low.toFixed(), // 최저가
  //       price.close.toFixed(), // 종가
  //     ])
  //   );
  return (
    <ApexCharts
      type="candlestick"
      series={[
        {
          name: "Price",
          data: data?.map((price) => {
            return {
              x: new Date(price.time_open),
              y: [price.open, price.high, price.low, price.close],
            };
          }) as any,
        },
      ]}
      options={{
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#DF7D46", // 상승 시 색상
              downward: "#3C90EB", // 하락 시 색상
            },
          },
        },
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          width: 500,
          height: 500,
          background: "transparent",
        },
        yaxis: {
          labels: {
            formatter: (val) => val.toFixed(),
          },
          //   show: false,
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          y: {
            formatter: (value) => `$ ${value}`,
          },
        },
      }}
    />
  );
}

export default StickChart;
