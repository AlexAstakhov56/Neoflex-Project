import { FC } from "react";
import { TCurrency } from "../../types/TCurrency.type";
import "./ExchangeSection.scss";

type TExchangeSectionProps = {
  currencyInfo: TCurrency[];
  lastUpdated: string;
  loading: boolean;
};

export const ExchangeSection: FC<TExchangeSectionProps> = ({
  currencyInfo,
  lastUpdated,
  loading,
}) => {
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
            {loading ? (
              <p>Loading...</p>
            ) : (
              currencyInfo.map((cur) => (
                <li key={cur.currency}>
                  {cur.currency}: <span>{cur.value}</span>
                </li>
              ))
            )}
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
