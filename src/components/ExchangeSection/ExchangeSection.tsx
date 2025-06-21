import { FC, useEffect, useState } from "react";
import "./ExchangeSection.scss";
import axios from "axios";

type TCurrency = {
  currency: string;
  value: number;
};

// const currencyInfo: TCurrency[] = [
//   {
//     currency: "USD",
//     value: 60.78,
//   },
//   {
//     currency: "CNY",
//     value: 9.08,
//   },
//   {
//     currency: "CHF",
//     value: 64.78,
//   },
//   {
//     currency: "usd",
//     value: 60.78,
//   },
//   {
//     currency: "JPY",
//     value: 0.46,
//   },
//   {
//     currency: "TRY",
//     value: 3.39,
//   },
// ];

const baseURL = "https://v6.exchangerate-api.com/v6";
const endpoint = "/latest";
const access_key = "d3198f26ece9d4962ab7c361";
const currencies = ["USD", "EUR", "CHF", "KZT", "CNY", "SDG"];

export const ExchangeSection: FC = () => {
  const [currencyInfo, setCurrencyInfo] = useState<TCurrency[]>([]);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleString()
  );

  const getCurrencies = async (currency = "USD") => {
    const url = baseURL + `/${access_key}` + endpoint + `/${currency}`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  };

  const findCurrencies = async (currencies: string[]) => {
    const currencyValues: TCurrency[] = [];
    for (const cur of currencies) {
      const currencyData = await getCurrencies(cur);
      setRequestCount((prev) => prev + 1);
      if (!currencyData) {
        return;
      }
      const value = currencyData.conversion_rates["RUB"].toFixed(2);
      if (value) {
        currencyValues.push({ currency: cur, value });
      }
    }
    setCurrencyInfo(currencyValues);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await findCurrencies(currencies);
  //   };
  //   fetchData();
  //   const interval = setInterval(async () => {
  //     if (requestCount < 1000) {
  //       await fetchData();
  //       setLastUpdated(new Date().toLocaleString());
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 15 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, [requestCount]);

  return (
    <section className="container exchange">
      <div className="exchange__wrapper">
        <div className="exchange__info">
          <h3 className="exchange__title">Exchange rate in internet bank</h3>
          <p className="exchange__time">Last Update: {lastUpdated}</p>
        </div>
        <h4>Currency</h4>
        <div className="exchange__currencies">
          <ul className="exchange__currencies_grid">
            {currencyInfo.map((cur) => (
              <li key={cur.currency}>
                {cur.currency}: <span>{cur.value}</span>
              </li>
            ))}
          </ul>
          <img
            src="/Images/BankImage.png"
            alt="Bank"
            className="exchange__currencies_img"
          />
        </div>
        <a href="#" className="exchange__link">
          All courses
        </a>
      </div>
    </section>
  );
};
