import { FC, useEffect, useState } from "react";
import {
  SubscribeSection,
  ServicesSection,
  NewsSection,
  ExchangeSection,
  DesignSection,
  FeaturesSection,
} from "../../components";
import { Layout } from "../../layout";
import { isUrlToImageCorrect, ScrollToTop } from "../../utils";
import { getCurrencies, getNews } from "../../api";
import { TCurrency } from "../../types/TCurrency.type";
import { TNews } from "../../types/TNews.type";

const currencies = ["USD", "EUR", "CHF", "KZT", "CNY", "SDG"];

export const HomePage: FC = () => {
  const [currencyInfo, setCurrencyInfo] = useState<TCurrency[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleString()
  );
  const [news, setNews] = useState<TNews[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCurrencyError, setIsCurrencyError] = useState<boolean>(false);
  const [isNewsError, setIsNewsError] = useState<boolean>(false);

  // const findCurrencies = async (currencies: string[]) => {
  //   const currencyValues: TCurrency[] = [];
  //   try {
  //     for (const cur of currencies) {
  //       const currencyData = await getCurrencies(cur);

  //       if (!currencyData || !currencyData.conversion_rates) {
  //         throw new Error("Invalid data");
  //       }

  //       const rubRate = currencyData.conversion_rates["RUB"];
  //       const value = rubRate.toFixed(2);
  //       currencyValues.push({ currency: cur, value });
  //     }
  //     setCurrencyInfo(currencyValues);
  //     setIsCurrencyError(false);
  //   } catch (error) {
  //     console.error(error);
  //     setIsCurrencyError(true);
  //     return [];
  //   }
  // };

  // const fetchNews = async () => {
  //   try {
  //     const freshNews: TNews[] = await getNews();
  //     const validatedNews = await Promise.all(
  //       freshNews.map(async (n) => {
  //         const isValid = await isUrlToImageCorrect(n.urlToImage);
  //         return isValid ? n : null;
  //       })
  //     );
  //     setNews(validatedNews.filter((n) => n !== null));
  //     setIsNewsError(false);
  //   } catch (error) {
  //     console.error(error);
  //     setIsNewsError(true);
  //   }
  // };

  // useEffect(() => {
  //   const fetchCurrenciesAndNews = async () => {
  //     setLoading(true);
  //     await findCurrencies(currencies);
  //     await fetchNews();
  //     setLoading(false);
  //   };
  //   fetchCurrenciesAndNews();

  //   const interval = setInterval(async () => {
  //     await findCurrencies(currencies);
  //     setLastUpdated(new Date().toLocaleString());
  //     clearInterval(interval);
  //   }, 15 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <ScrollToTop />
      <Layout>
        <main className="container">
          <DesignSection />
          <FeaturesSection />
          <ExchangeSection
            currencyInfo={currencyInfo}
            lastUpdated={lastUpdated}
            loading={loading}
            isError={isCurrencyError}
          />
          <ServicesSection />
          <NewsSection news={news} loading={loading} isError={isNewsError} />
          <SubscribeSection />
        </main>
      </Layout>
    </>
  );
};
