import { FC, useState } from "react";
import { Accordion, Title } from "../../components";
import "./FAQTab.scss";

type TAccordionInfo = {
  id: number;
  title: string;
  description: string;
};

const accordionInfo1: TAccordionInfo[] = [
  {
    id: 0,
    title: "How to get a card?",
    description:
      "We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days.",
  },
  {
    id: 1,
    title: "What documents are needed and how old should one be to get a card?",
    description: "Need a passport. You must be between 20 and 70 years old.",
  },
  {
    id: 2,
    title: "In what currency can I issue a card?",
    description: "In rubles, dollars or euro.",
  },
  {
    id: 3,
    title: "How much income do I need to get a credit card?",
    description:
      "To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.",
  },
  {
    id: 4,
    title: "How do I find out about the bank's decision on my application?",
    description:
      "After registration, you will receive an e-mail with a decision on your application.",
  },
];

const accordionInfo2: TAccordionInfo[] = [
  {
    id: 5,
    title: "What is an interest free credit card?",
    description:
      "A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.",
  },
  {
    id: 6,
    title: "How to activate a credit card?",
    description:
      "You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.",
  },
  {
    id: 7,
    title: "What is a settlement date?",
    description:
      "The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.",
  },
  {
    id: 8,
    title: "What do I need to know about interest rates?",
    description:
      "For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.",
  },
];

export const FAQTab: FC = () => {
  const [activeAccordionId, setActiveAccordionId] = useState<number | null>(
    null
  );

  const handleAccordionClick = (id: number) => {
    setActiveAccordionId(activeAccordionId === id ? null : id);
  };

  return (
    <section className="faqTab">
      <Title
        title="Issuing and receiving a card"
        marginTop={32}
        marginBottom={32}
      />
      <div className="faqTab__accordion">
        {accordionInfo1.map((acc, index) => (
          <Accordion
            key={acc.title}
            title={acc.title}
            description={acc.description}
            isActive={activeAccordionId === acc.id}
            isLast={index === accordionInfo1.length - 1}
            onClick={() => handleAccordionClick(acc.id)}
          />
        ))}
      </div>

      <Title title="Using a credit card" marginTop={32} marginBottom={32} />
      <div className="faqTab__accordion">
        {accordionInfo2.map((acc, index) => (
          <Accordion
            key={acc.title}
            title={acc.title}
            description={acc.description}
            isActive={activeAccordionId === acc.id}
            isLast={index === accordionInfo2.length - 1}
            onClick={() => handleAccordionClick(acc.id)}
          />
        ))}
      </div>
    </section>
  );
};
