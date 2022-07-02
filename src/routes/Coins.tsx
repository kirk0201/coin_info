import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { coinFetch } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom, modeAtom } from "../atom";
import ModeBtn from "../components/ModeBtn";
export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const API = `https://api.coinpaprika.com/v1/coins`;

export default function Coins() {
  /* React Query 사용 전 */
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState<Boolean>(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(API);
  //     const json = await response.json();

  //     setCoins(json.slice(0, 100));
  //     setLoading(!loading);
  //     console.log(json.slice(0, 100));
  //   })();
  // }, []);

  /* React Query 사용 */
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", coinFetch);

  return (
    <Container>
      <Helmet>
        <title>CoinTracker</title>
      </Helmet>

      <Header>
        <Title>CoinTracker</Title>
        {/* <button onClick={toggleDarkHandler}>Toggle Button</button> */}
        <ModeBtn />
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 99).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  width="40px"
                  height="40px"
                />
                코인명 : {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  a {
    display: flex;
    align-items: center;
  }
`;
const Loader = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 700;
  font-style: italic;
`;
