import StickChart from "../components/StickChart";
import VolumeChart from "../components/VolumeChart";

interface IChartProps {
  coinId: string;
}

interface IData {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
export default function Chart({ coinId }: IChartProps) {
  // const coinId = useOutletContext<IChartProps>();
  // console.log(coinId)
  // console.log(data);

  return (
    <div>
      <StickChart coinId={coinId} />
      <VolumeChart coinId={coinId} />
    </div>
  );
}
