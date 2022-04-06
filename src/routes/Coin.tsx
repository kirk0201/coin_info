import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { infoCoinFetch, priceCoinFetch } from "../api";
import Chart from "./Chart";
import { ICoin } from "./Coins";
import Price from "./Price";

interface RouteState {
  state: ICoin;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: { USD: IPriceUsd };
}
export interface IPriceUsd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
  priceProps?: string;
}
export default function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);

  // console.log(priceMatch);
  // console.log(chartMatch);

  /* React Query 적용 전 */
  // const [loading, setLoading] = useState<Boolean>(true);
  // const [infoData, setInfoData] = useState<IInfoData>();
  // const [priceData, setPriceData] = useState<IPriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await fetch(
  //       `https://api.coinpaprika.com/v1/coins/${coinId}`
  //     );
  //     const infoRes = await infoData.json();
  //     setInfoData(infoRes);
  //     console.log(infoRes);

  //     const priceData = await fetch(
  //       `https://api.coinpaprika.com/v1/tickers/${coinId}`
  //     );
  //     const priceRes = await priceData.json();
  //     setPriceData(priceRes);
  //     console.log(priceRes);
  //     setLoading(false);
  //   })();
  // }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => infoCoinFetch(coinId!)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => priceCoinFetch(coinId!),
    {
      refetchInterval: 10000,
    }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Price:</span>
              <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>total_supply:</span>
              <span>{priceData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>max_supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={"price"}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={"chart"}>Chart</Link>
            </Tab>
          </Tabs>
          {/* <Outlet context={coinId as string} /> */}
          <Routes>
            <Route
              path={"price"}
              element={<Price coinId={coinId as string} />}
            ></Route>
            <Route
              path={"chart"}
              element={<Chart coinId={coinId as string} />}
            ></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  text-align: center;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 5px;
`;
const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  margin-bottom: 5px;
`;

const Tabs = styled.div`
  display: flex;
`;
const Tab = styled.span<{ isActive: boolean }>`
  flex: 1 1;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  margin: 5px;
  padding: 5px 0;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
