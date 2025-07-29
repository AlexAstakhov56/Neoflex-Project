import { forwardRef, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setOfferChosen } from "../../store/formsSlice";
import { OfferCard } from "../OfferCard";
import "./OffersSection.scss";
import { TOfferData } from "../../types/TOfferData.type";
import { Loader } from "../UI";

export const OffersSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { offers } = useAppSelector((state) => state.offers);

  const applyForOffer = async (offer: TOfferData) => {
    setIsLoading(true);
    try {
      const resp = await axios.post(
        "http://localhost:8080/application/apply",
        offer
      );
      if (resp.status === 200) {
        dispatch(setOfferChosen(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div ref={ref}>
      {isLoading ? (
        <Loader marginTop={50} marginBottom={50} />
      ) : (
        <section className="offersSection">
          {offers.map((offer) => (
            <OfferCard key={offer.rate} {...offer} onClick={applyForOffer} />
          ))}
        </section>
      )}
    </div>
  );
});
