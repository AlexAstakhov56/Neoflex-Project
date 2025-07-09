import { FC } from "react";
import { Title } from "../../components";
import "./InfoCard.scss";

type TInfoCardProps = {
  icon?: string;
  title: string;
  text: string;
  isEven: boolean;
  type?: "about" | "cashback";
};

export const InfoCard: FC<TInfoCardProps> = ({
  icon = "",
  title,
  text,
  isEven,
  type = "about",
}) => {
  return (
    <div
      className={`infoCard ${
        type === "about" ? (isEven ? "even1" : "") : isEven ? "even2" : ""
      }`}
    >
      {type === "about" ? (
        <>
          <img src={icon} className="infoCard__icon" alt="about-icon" />
          <Title title={title} marginBottom={16} />
          <p className="infoCard__text1">{text}</p>
        </>
      ) : (
        <>
          <p className="infoCard__text2">{text}</p>
          <Title title={title} fontSize={"large"} />
        </>
      )}
    </div>
  );
};
