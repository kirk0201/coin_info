import PriceComponent from "../components/PriceComponent";
import { IChartProps } from "../components/StickChart";

export default function Price({ coinId }: IChartProps) {
  return <PriceComponent coinId={coinId} />;
}
