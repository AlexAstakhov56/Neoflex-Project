import { FC } from "react";
import "./ExchangeSection.scss";

type TCurrency = {
  currency: string;
  value: number;
};

const currencyInfo: TCurrency[] = [
  {
    currency: "USD",
    value: 60.78,
  },
  {
    currency: "CNY",
    value: 9.08,
  },
  {
    currency: "CHF",
    value: 64.78,
  },
  {
    currency: "usd",
    value: 60.78,
  },
  {
    currency: "JPY",
    value: 0.46,
  },
  {
    currency: "TRY",
    value: 3.39,
  },
];

export const ExchangeSection: FC = () => {
  return (
    <section className="container exchange">
      <div className="exchange__wrapper">
        <div className="exchange__info">
          <h3 className="exchange__title">Exchange rate in internet bank</h3>
          <p className="exchange__time">
            Update every 15 minutes, MSC 09.08.2022
          </p>
        </div>
        <h4>Currency</h4>
        <div className="exchange__currencies">
          <ul className="exchange__currencies_grid">
            {currencyInfo.map((cur) => (
              <li key={cur.currency}>
                {cur.currency.toUpperCase()}: <span>{cur.value}</span>
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
