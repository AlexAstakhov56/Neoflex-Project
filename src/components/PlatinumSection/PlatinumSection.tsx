import { FC } from "react";
import { Tooltip, Button } from "../../components";
import "./PlatinumSection.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { isPrescoringPosted, isOfferChosen } = useAppSelector(
    (state) => state.forms
  );
  const { applicationId, currentStep } = useAppSelector(
    (state) => state.application
  );

  const handleContinueClick = () => {
    if (applicationId === null) {
      console.error("Application id is not set!");
      return;
    }
    switch (currentStep) {
      case 2:
        navigate(`/loan/${applicationId}`);
        break;
      case 3:
        navigate(`/loan/${applicationId}/document`);
        break;
      case 4:
        navigate(`/loan/${applicationId}/document/sign`);
        break;
      case 5:
        navigate(`/loan/${applicationId}/code`);
        break;
      default:
        navigate("/loan");
    }
  };

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
        {isOfferChosen ? (
          <span onClick={handleContinueClick}>Continue registration</span>
        ) : isPrescoringPosted ? (
          <span>Choose an offer</span>
        ) : (
          <span>Apply for card</span>
        )}
      </Button>
    </section>
  );
};
