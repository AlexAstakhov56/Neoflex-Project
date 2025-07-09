import { FC } from "react";
import { TCurrency } from "../../types/TCurrency.type";
import { Loader } from "../../components";
import "./ExchangeSection.scss";

type TExchangeSectionProps = {
  currencyInfo: TCurrency[];
  lastUpdated: string;
  loading: boolean;
  isError: boolean;
};

export const ExchangeSection: FC<TExchangeSectionProps> = ({
  currencyInfo,
  lastUpdated,
  loading,
  isError,
}) => {
  return (
    <section className="exchange">
      <div className="exchange__wrapper">
        <div className="exchange__info">
          <h3 className="exchange__title">Exchange rate in internet bank</h3>
          <p className="exchange__time">Last Update: {lastUpdated}</p>
        </div>
        <h4>Currency</h4>
        <div className="exchange__currencies">
          <ul className="exchange__currencies_grid">
            {isError && (
              <p>Не удалось загрузить данные о текущем курсе валют</p>
            )}
            {loading ? (
              <Loader />
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
