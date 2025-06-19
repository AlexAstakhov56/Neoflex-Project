import { FC } from "react";
import {
  SubscribeSection,
  ServicesSection,
  NewsSection,
  ExchangeSection,
  DesignSection,
  FeaturesSection,
} from "../../components";
import { Layout } from "../../layout";
import { ScrollToTop } from "../../utils";

export const HomePage: FC = () => {
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
