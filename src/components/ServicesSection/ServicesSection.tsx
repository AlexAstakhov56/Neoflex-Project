import { FC } from "react";
import "./ServicesSection.scss";

export const ServicesSection: FC = () => {
  return (
    <section className="container services">
      <h3 className="services__title">
        You can use our services anywhere in the world
      </h3>
      <p className="services__text">
        Withdraw and transfer money online through our application
      </p>
      <img src="/Images/MapImage.svg" alt="map" className="services__image" />
    </section>
  );
};
