import { FC } from "react";
import { Divider } from "../Divider";
import "./Accordion.scss";

type TAccordionProps = {
  title: string;
  description: string;
  icon?: string;
  isActive: boolean;
  isLast?: boolean;
  onClick: () => void;
};

export const Accordion: FC<TAccordionProps> = ({
  title,
  description,
  icon = "/Icons/accordion_arrow.svg",
  isActive,
  isLast = false,
  onClick,
}) => {
  return (
    <>
      <div className="accordion">
        <div className="accordion__top" onClick={onClick}>
          <h3 className="accordion__title">{title}</h3>
          <img
            className={`accordion__icon ${isActive ? "rotate" : ""}`}
            src={icon}
            alt="accordion-icon"
          />
        </div>
        <div className={`accordion__description ${isActive ? "active" : ""} `}>
          {description}
        </div>
      </div>
      {!isLast && <Divider width={1300} height={1} backgroundColor="#E2E8F0" />}
    </>
  );
};
