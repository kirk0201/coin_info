import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { priceCoinFetch } from "../api";
import { isDarkAtom } from "../atom";
import { IPriceData, IPriceUsd } from "../routes/Coin";
import { IChartProps, IData } from "./StickChart";

interface IPriceProps {
  coinId: string;
}
function PriceComponent({ coinId }: IPriceProps) {
  const getDarkAtom = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IPriceData>(["coinPrice", coinId], () =>
    priceCoinFetch(coinId)
  );

  const priceData = data?.quotes.USD;
  const priceColor = (data?: number) => {
    if (data) {
      return data > 0;
    }
  };

  return (
    <>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 15m)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_15m) === true}>
          <div>{priceData?.percent_change_15m}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 30m)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_30m) === true}>
          <div>{priceData?.percent_change_30m}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 1h)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_1h) === true}>
          <div>{priceData?.percent_change_1h}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 6h)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_6h) === true}>
          <div>{priceData?.percent_change_6h}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 24h)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_24h) === true}>
          <div>{priceData?.percent_change_24h}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 7d)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_7d) === true}>
          <div>{priceData?.percent_change_7d}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 30d)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_30d) === true}>
          <div>{priceData?.percent_change_30d}</div>
        </Price>
      </Wrapper>
      <Wrapper isDark={getDarkAtom}>
        <Name>Change rate(last 1y)</Name>
        <Price isCheck={priceColor(priceData?.percent_change_1y) === true}>
          <div>{priceData?.percent_change_1y}</div>
        </Price>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div<{ isDark: boolean }>`
  display: flex;
  padding: 15px 15px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)"};
  margin-top: 10px;
  margin-bottom: 10px;
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

const Price = styled.div<{ isCheck: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  div {
    padding: 10px 10px;
    background-color: white;
    border-radius: 10px;
    color: ${(props) => (props.isCheck ? "red" : "blue")};
    font-weight: 700;
  }
`;
export default PriceComponent;
