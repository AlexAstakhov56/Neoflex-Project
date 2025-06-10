import { FC } from "react";
import DesignSection from "../../components/DesignSection/DesignSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import ExchangeSection from "../../components/ExchangeSection/ExchangeSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import NewsSection from "../../components/NewsSection/NewsSection";
import SubscribeSection from "../../components/SubscribeSection/SubscribeSection";

const HomePage: FC = () => {
  return (
    <main>
      <DesignSection />
      <FeaturesSection />
      <ExchangeSection />
      <ServicesSection />
      <NewsSection />
      <SubscribeSection />
    </main>
  );
};

export default HomePage;
