import { FC } from "react";
import "./AboutTab.scss";
import { InfoCard } from "../InfoCard";

type TAboutCardInfo = {
  icon: string;
  title: string;
  text: string;
  isEven: boolean;
};

const aboutCardInfo: TAboutCardInfo[] = [
  {
    icon: "/Icons/money_icon.svg",
    title: "Up to 50 000 ₽",
    text: "Cash and transfers without commission and percent",
    isEven: false,
  },
  {
    icon: "/Icons/calendar_icon.svg",
    title: "Up to 160 days",
    text: "Without percent on the loan",
    isEven: true,
  },
  {
    icon: "/Icons/clock_icon.svg",
    title: "Free delivery",
    text: "We will deliver your card by courier at a convenient place and time for you",
    isEven: false,
  },
  {
    icon: "/Icons/bag_icon.svg",
    title: "Up to 12 months",
    text: "No percent. For equipment, clothes and other purchases in installments",
    isEven: true,
  },
  {
    icon: "/Icons/credit_card_icon.svg",
    title: "Convenient deposit and withdrawal",
    text: "At any ATM. Top up your credit card for free with cash or transfer from other cards",
    isEven: false,
  },
];

export const AboutTab: FC = () => {
  return (
    <section className="aboutTab">
      {aboutCardInfo.map((card) => (
        <InfoCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          text={card.text}
          isEven={card.isEven}
        />
      ))}
    </section>
  );
};
