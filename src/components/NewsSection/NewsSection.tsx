import { FC, useEffect, useRef, useState } from "react";
import { NewsCard } from "../";
import { TNews } from "../../types/TNews.type";
import "./NewsSection.scss";

type TNewsSectionProps = {
  news: TNews[];
  loading: boolean;
};

export const NewsSection: FC<TNewsSectionProps> = ({ loading, news }) => {
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState<number>(1240);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
