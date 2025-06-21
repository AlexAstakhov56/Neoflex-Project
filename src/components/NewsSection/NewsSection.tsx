import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./NewsSection.scss";
import { NewsCard } from "../NewsCard";

const api_key = "08226eeb1b9e414d96830ffe69235d0a";
const baseURL = "https://newsapi.org/v2";
const endpoint = "/top-headlines?country=us";

type TNews = {
  source: {
    id: number | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export const NewsSection: FC = () => {
  const [news, setNews] = useState<TNews[]>([]);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState<number>(1240);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getNews = async () => {
    const url = baseURL + endpoint + `&apiKey=${api_key}`;
    try {
      const resp = await axios.get(url);
      if (requestCount < 100) setRequestCount((prev) => prev + 1);
      else return [];
      return resp.data.articles;
    } catch (error) {
      console.error(error);
    }
  };

  const isUrlToImageCorrect = (url: string) => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = url;

      const timeout = setTimeout(() => {
        resolve(false);
      }, 2000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve(img.width > 0 && img.height > 0);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
    });
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const freshNews: TNews[] = await getNews();

        const validatedNews = await Promise.all(
          freshNews.map(async (n) => {
            const isValid = await isUrlToImageCorrect(n.urlToImage);
            return isValid ? n : null;
          })
        );
        setNews(validatedNews.filter((n) => n !== null));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (containerRef.current)
        setContainerWidth(containerRef.current.clientWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = 320;
  const gap = windowWidth < 900 ? 20 : 80;
  const scrollStep = windowWidth < 900 ? 340 : 400;

  const handlePrev = () => {
    setCurrentPosition((prev) => Math.min(prev + scrollStep, 0));
  };

  const handleNext = () => {
    const maxScroll = -(news.length * (cardWidth + gap) - containerWidth);
    setCurrentPosition((prev) => Math.max(prev - scrollStep, maxScroll));
  };

  return (
    <section className="container news" ref={containerRef}>
      <h3 className="news__title">Current news from the world of finance</h3>
      <p className="news__text">
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>
      <div className="news__slider">
        <div
          className="news__wrapper"
          ref={sliderRef}
          style={{
            transform: `translateX(${currentPosition}px)`,
            gap: `${gap}px`,
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            news.map((n) => (
              <NewsCard
                key={n.title}
                link={n.url}
                title={n.title}
                img={n.urlToImage}
                description={n.description}
              />
            ))
          )}
        </div>
      </div>

      <div className="news__arrows">
        {currentPosition >= 0 ? (
          <img src="/Icons/arrow_disabled.svg" alt="arrow-left" />
        ) : (
          <img
            src="/Icons/arrow_active.svg"
            alt="arrow-left"
            className="rotate"
            onClick={handlePrev}
          />
        )}
        {currentPosition <=
        -(news.length * (cardWidth + gap) - containerWidth) ? (
          <img
            src="/Icons/arrow_disabled.svg"
            alt="arrow-right"
            className="rotate"
          />
        ) : (
          <img
            src="/Icons/arrow_active.svg"
            alt="arrow-right"
            onClick={handleNext}
          />
        )}
      </div>
    </section>
  );
};
