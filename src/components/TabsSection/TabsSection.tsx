import { FC } from "react";
import {
  AboutTab,
  RatesTab,
  CashbackTab,
  FAQTab,
  Tabs,
} from "../../components";
import "./TabsSection.scss";

export const TabsSection: FC = () => {
  return (
    <section className="tabsSection">
      <Tabs
        tabsInfo={[
          { id: 0, label: "About card", component: <AboutTab /> },
          { id: 1, label: "Rates and conditions", component: <RatesTab /> },
          { id: 2, label: "Cashback", component: <CashbackTab /> },
          { id: 3, label: "FAQ", component: <FAQTab /> },
        ]}
      />
    </section>
  );
};
