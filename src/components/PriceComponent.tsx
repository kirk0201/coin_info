import { useQuery } from "react-query";
import styled from "styled-components";
import { priceCoinFetch } from "../api";
import { IPriceData, IPriceUsd } from "../routes/Coin";
import { IChartProps, IData } from "./StickChart";

interface IPriceProps {
  coinId: string;
}
function PriceComponent({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(["coinPrice", coinId], () =>
    priceCoinFetch(coinId)
  );

  const priceData = data?.quotes.USD;

  return (
    <Container>
      <Name>Change rate(last 15m)</Name>
      <Price>
        <div>{priceData?.percent_change_15m}</div>
      </Price>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 15px 15px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Name = styled.div`
  flex: 1;
  position: relative;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: ":";
    position: absolute;
    right: 0;
  }
`;
const Price = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  div {
    padding: 10px 10px;
    background-color: white;
    color: blue;
  }
`;
export default PriceComponent;
