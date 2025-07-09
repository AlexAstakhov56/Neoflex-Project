import { FC } from "react";
import "./CashbackTab.scss";
import { InfoCard } from "../InfoCard";

type TCashbackCardInfo = {
  text: string;
  title: string;
  isEven: boolean;
};

const cashbackCardInfo: TCashbackCardInfo[] = [
  {
    text: "For food delivery, cafes and restaurants",
    title: "5%",
    isEven: false,
  },
  {
    text: "In supermarkets with our subscription",
    title: "5%",
    isEven: true,
  },
  {
    text: "In clothing stores and children's goods",
    title: "2%",
    isEven: false,
  },
  {
    text: "Other purchases and payment of services and fines",
    title: "1%",
    isEven: true,
  },
  {
    text: "Shopping in online stores",
    title: "up to 3%",
    isEven: false,
  },
  {
    text: "Purchases from our partners",
    title: "30%",
    isEven: true,
  },
];

export const CashbackTab: FC = () => {
  return (
    <section className="cashbackTab">
      {cashbackCardInfo.map((card) => (
        <InfoCard
          key={card.text}
          type="cashback"
          text={card.text}
          title={card.title}
          isEven={card.isEven}
        />
      ))}
    </section>
  );
};
