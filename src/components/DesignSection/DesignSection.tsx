import { FC } from "react";
import { Button } from "../";
import "./DesignSection.scss";

type TImage = {
  src: string;
  alt: string;
};

const Images: TImage[] = [
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

export const DesignSection: FC = () => {
  return (
    <section className="design">
      <div className="design__info">
        <h1 className="design__title">
          Choose the design you like and apply for card right now
        </h1>
        <Button>Choose the card</Button>
      </div>

      <div className="design__cards">
        {Images.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
    </section>
  );
};
