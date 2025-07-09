import { FC } from "react";
import "./RatesTab.scss";
import { Divider } from "../UI";

type TRate = {
  title: string;
  info: string[];
};

const rates: TRate[] = [
  {
    title: "Card currency",
    info: ["Rubles, dollars, euro"],
  },
  {
    title: "Interest free period",
    info: ["0% up to 160 days"],
  },
  {
    title: "Payment system",
    info: ["Mastercard, Visa"],
  },
  {
    title: "Maximum credit limit on the card",
    info: ["600 000 ₽"],
  },
  {
    title: "Replenishment and withdrawal",
    info: [
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
    ],
  },
  {
    title: "Max cashback per month",
    info: ["15 000 ₽"],
  },
  {
    title: "Transaction Alert",
    info: [
      "60 ₽ — SMS or push notifications",
      "0 ₽ — card statement, information about transactions in the online bank",
    ],
  },
];

export const RatesTab: FC = () => {
  return (
    <section className="ratesTab">
      {rates.map((r) => (
        <div key={r.title}>
          <div className="ratesTab__item">
            <h3 className="ratesTab__title">{r.title}</h3>
            <div className="ratesTab__info">
              {r.info.map((text) => (
                <p key={text} className="ratesTab__text">
                  {text}
                </p>
              ))}
            </div>
          </div>
          {r.title !== rates[rates.length - 1].title && (
            <Divider width={1016} height={1} backgroundColor="#7f92ac" />
          )}
        </div>
      ))}
    </section>
  );
};
