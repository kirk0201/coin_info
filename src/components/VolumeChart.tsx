import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { ohlcFetch } from "../api";
import { isDarkAtom } from "../atom";
import { IChartProps, IData } from "./StickChart";

function VolumeChart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IData[]>(["ohlc", coinId], () =>
    ohlcFetch(coinId)
  );
  //   console.log(data?.map((price) => [price.volume]));
  return (
    <ApexCharts
      type="bar"
      series={[
        {
          name: "Volume",
          data: data?.map((price) => {
            return {
              x: new Date((price.time_open as any) * 1000),
              y: price.volume,
            };
          }) as any,
        },
      ]}
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          type: "bar",
          height: 200,
          brush: {
            enabled: false,
          },
          selection: {
            enabled: true,
            xaxis: {},
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            colors: {
              ranges: [
                {
                  from: -1000,
                  to: 0,
                  color: "#F15B46",
                },
                {
                  from: 1,
                  to: 1000,
                  color: "#FEB019",
                },
              ],
            },
          },
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            offsetX: 13,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      }}
    />
  );
}

export default VolumeChart;
