import { FC } from "react";
import "./NewsCard.scss";

type TNewsCardProps = {
  link: string;
  title: string;
  img: string;
  description: string;
};

export const NewsCard: FC<TNewsCardProps> = ({
  link,
  title,
  img,
  description,
}) => {
  return (
    <div className="card">
      <a href={link} target="_blank">
        <img src={img} alt="news image" className="card__image" />
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </a>
    </div>
  );
};
