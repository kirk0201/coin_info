export function coinFetch() {
  return fetch(`https://api.coinpaprika.com/v1/coins`).then((res) =>
    res.json()
  );
}

export function infoCoinFetch(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
}

export function priceCoinFetch(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
}

export function ohlcFetch(coinId: string) {
  const endDate = Math.round(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  // const startDate = endDate - 60 * 60 * 24;
  console.log(endDate);
  // console.log(startDate);
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    // `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
}
