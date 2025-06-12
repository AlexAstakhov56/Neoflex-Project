import { FC } from "react";
import Button from "../Button/Button";
import "./DesignSection.scss";
import { IImage } from "../../types/Image.interface";

const Images: IImage[] = [
  {
    src: "/Images/cardImage1.png",
    alt: "card1",
  },
  {
    src: "/Images/cardImage2.png",
    alt: "card2",
  },
  {
    src: "/Images/cardImage3.png",
    alt: "card3",
  },
  {
    src: "/Images/cardImage4.png",
    alt: "card4",
  },
];

const DesignSection: FC = () => {
  return (
    <section className="container design">
      <div className="design__info">
        <h1 className="design__title">
          Choose the design you like and apply for card right now
        </h1>
        <Button text="Choose the card" />
      </div>

      <div className="design__cards">
        {Images.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
    </section>
  );
};

export default DesignSection;
