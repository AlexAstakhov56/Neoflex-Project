import { FC } from "react";
import "./FeaturesSection.scss";

const features: string[] = [
  "Powerfull online protection.",
  "Cashback without borders.",
  "Personal design",
  "Work anywhere in the world",
];

export const FeaturesSection: FC = () => {
  return (
    <section className="container features">
      <img src="/Images/FeaturesImage.png" alt="featuresImg" />

      <div className="features__info">
        <h2 className="features__title">
          We Provide Many Features You Can Use
        </h2>
        <p className="features__text">
          You can explore the features that we provide with fun and have their
          own functions each feature
        </p>

        <ul className="features__list">
          {features.map((f) => (
            <li key={f} className="features__list_item">
              <img src="/Icons/check.svg" alt="check" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
