import { FC } from "react";
import { Title } from "../../components";
import "./ServicesSection.scss";

export const ServicesSection: FC = () => {
  return (
    <section className="services">
      <Title
        title="You can use our services anywhere in the world"
        color="#1c1c1c"
        fontWeight={500}
        marginBottom={12}
      />
      <p className="services__text">
        Withdraw and transfer money online through our application
      </p>
      <img src="/Images/MapImage.svg" alt="map" className="services__image" />
    </section>
  );
};
