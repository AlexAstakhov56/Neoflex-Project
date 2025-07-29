import { FC } from "react";
import { Button } from "../UI";
import "./OfferCard.scss";
import { TOfferData } from "../../types/TOfferData.type";

type TOfferCardProps = TOfferData & {
  onClick: (offer: TOfferData) => void;
};

export const OfferCard: FC<TOfferCardProps> = ({
  applicationId,
  requestedAmount,
  totalAmount,
  monthlyPayment,
  term,
  rate,
  isInsuranceEnabled,
  isSalaryClient,
  onClick,
}) => {
  const handleClick = () => {
    const offerData: TOfferData = {
      applicationId,
      requestedAmount,
      totalAmount,
      monthlyPayment,
      term,
      rate,
      isInsuranceEnabled,
      isSalaryClient,
    };
    onClick(offerData);
  };

  return (
    <div className="offerCard">
      <img
        src="/Images/OfferCardImage.png"
        className="offerCard__img"
        alt="offerCardImg"
      />
      <div className="offerCard__conditions">
        <p className="offerCard__text">Requested amount: {requestedAmount} ₽</p>
        <p className="offerCard__text">Total amount: {totalAmount} ₽</p>
        <p className="offerCard__text">For {term} months</p>
        <p className="offerCard__text">Monthly payment: {monthlyPayment} ₽</p>
        <p className="offerCard__text">Your rate: {rate}%</p>
        <div className="offerCard__textWrapper">
          <p className="offerCard__text">Insurance included</p>
          {isInsuranceEnabled ? (
            <img src="/Icons/success_icon.svg" />
          ) : (
            <img src="/Icons/error_icon.svg" />
          )}
        </div>
        <div className="offerCard__textWrapper">
          <p className="offerCard__text">Salary client</p>
          {isSalaryClient ? (
            <img src="/Icons/success_icon.svg" />
          ) : (
            <img src="/Icons/error_icon.svg" />
          )}
        </div>
      </div>
      <Button borderRadius={8} paddingX={50} onClick={handleClick}>
        Select
      </Button>
    </div>
  );
};
