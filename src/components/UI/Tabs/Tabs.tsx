import { FC, ReactNode, useState } from "react";
import "./Tabs.scss";
import { Divider } from "../Divider";

type TTab = {
  id: number;
  label: string;
  component: ReactNode;
};

type TTabsProps = {
  tabsInfo: TTab[];
  defaultActiveTab?: number;
};

export const Tabs: FC<TTabsProps> = ({ tabsInfo, defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
  return (
    <>
      <ul className="tabs__titles">
        {tabsInfo.map((tab) => (
          <li
            className={`tabs__title ${activeTab === tab.id ? "active" : ""}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <Divider
        width={1300}
        height={2}
        backgroundColor="rgba(128, 128, 128, 0.2)"
      />
      {tabsInfo[activeTab].component}
    </>
  );
};
