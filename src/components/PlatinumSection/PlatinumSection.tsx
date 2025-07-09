import { FC } from "react";
import { Tooltip, Button } from "../../components";
import "./PlatinumSection.scss";

type TAdvantage = {
  adv: string;
  text: string;
  tip: string;
};

const advantages: TAdvantage[] = [
  {
    adv: "Up to 160 days",
    text: "No percent",
    tip: "When repaying the full debt up to 160 days.",
  },
  {
    adv: "Up to 600 000 ₽",
    text: "Credit limit",
    tip: "Over the limit willaccrue percent",
  },
  {
    adv: "0 ₽",
    text: "Card service is free",
    tip: "Promotion valid until December 31, 2022.",
  },
];

type TPlatinumSectionProps = {
  onApplyClick: () => void;
};

export const PlatinumSection: FC<TPlatinumSectionProps> = ({
  onApplyClick,
}) => {
  return (
    <section className="platinum">
      <h2 className="platinum__title">Platinum digital credit card</h2>
      <img
        src="/Images/cardImage1.png"
        alt="card"
        className="platinum__image"
      />
      <p className="platinum__text">
        Our best credit card. Suitable for everyday spending and shopping. Cash
        withdrawals and transfers without commission and interest.
      </p>
      <div className="platinum__advantages">
        {advantages.map((adv) => (
          <Tooltip key={adv.adv} text={adv.tip}>
            <div className="platinum__advantage">
              <h3 className="platinum__advantage_title">{adv.adv}</h3>
              <p className="platinum__text">{adv.text}</p>
            </div>
          </Tooltip>
        ))}
      </div>
      <Button onClick={onApplyClick} borderRadius={8}>
        Apply for card
      </Button>
    </section>
  );
};
