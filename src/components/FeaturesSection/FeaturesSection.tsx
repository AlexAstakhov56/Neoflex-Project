import { FC } from "react";
import "./FeaturesSection.scss";

const FeaturesSection: FC = () => {
  return (
    <section className="container features">
      <div className="features__image">
        <img src="/Images/FeaturesImage.png" alt="featuresImg" />
      </div>

      <div className="features__info">
        <h2 className="features__title">
          We Provide Many Features You Can Use
        </h2>
        <p className="features__text">
          You can explore the features that we provide with fun and have their
          own functions each feature
        </p>

        <ul className="features__list">
          <li className="features__list_item">
            <img src="/Icons/check.svg" alt="check" />
            Powerfull online protection.
          </li>
          <li className="features__list_item">
            <img src="/Icons/check.svg" alt="check" />
            Cashback without borders.
          </li>
          <li className="features__list_item">
            <img src="/Icons/check.svg" alt="check" />
            Personal design
          </li>
          <li className="features__list_item">
            <img src="/Icons/check.svg" alt="check" />
            Work anywhere in the world
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FeaturesSection;
