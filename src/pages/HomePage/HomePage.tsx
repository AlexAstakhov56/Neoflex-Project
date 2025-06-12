import { FC } from "react";
import DesignSection from "../../components/DesignSection/DesignSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import ExchangeSection from "../../components/ExchangeSection/ExchangeSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import NewsSection from "../../components/NewsSection/NewsSection";
import SubscribeSection from "../../components/SubscribeSection/SubscribeSection";
import Layout from "../../layout/Layout";
import ScrollToTop from "../../utils/ScrollToTop";

const HomePage: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <main>
          <DesignSection />
          <FeaturesSection />
          <ExchangeSection />
          <ServicesSection />
          <NewsSection />
          <SubscribeSection />
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
