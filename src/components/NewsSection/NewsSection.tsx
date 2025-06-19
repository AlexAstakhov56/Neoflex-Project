import { FC } from "react";
import "./NewsSection.scss";

export const NewsSection: FC = () => {
  return (
    <section className="container news">
      <h3 className="news__title">Current news from the world of finance</h3>
      <p className="news__text">
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>
      <div className="news__wrapper"></div>
    </section>
  );
};
