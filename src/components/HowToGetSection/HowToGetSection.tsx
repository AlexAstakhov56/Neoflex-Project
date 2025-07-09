import { FC } from "react";
import "./HowToGetSection.scss";
import { Divider, Title } from "../../components";

type TStep = {
  number: number;
  text: string;
};

const stepsInfo: TStep[] = [
  {
    number: 1,
    text: "Fill out an online application - you do not need to visit the bank",
  },
  {
    number: 2,
    text: "Find out the bank's decision immediately after filling out the application",
  },
  {
    number: 3,
    text: "The bank will deliver the card free of charge, wherever convenient, to your city",
  },
];

export const HowToGetSection: FC = () => {
  return (
    <section className="howToGet">
      <Title title="How to get a card" isCentered={true} marginBottom={18} />
      <div className="howToGet__steps">
        {stepsInfo.map((step) => (
          <div key={step.number} className="howToGet__step">
            <div className="howToGet__step_header">
              <div className="howToGet__step_number">{step.number}</div>
              <Divider
                width={280}
                height={2}
                backgroundColor="rgba(128, 128, 128, 0.2)"
              />
            </div>
            <p className="howToGet__step_text">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
