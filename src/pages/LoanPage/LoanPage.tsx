import { FC, RefObject, useRef } from "react";
import { Layout } from "../../layout";
import { ScrollToTop } from "../../utils";
import {
  PlatinumSection,
  TabsSection,
  HowToGetSection,
  CustomizeFormSection,
  OffersSection,
  Message,
} from "../../components";
import { useAppSelector } from "../../hooks/reduxHooks";

export const LoanPage: FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const offersSectionRef = useRef<HTMLDivElement>(null);

  const scrollToElement = (ref: RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      const position = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: position - 70,
        behavior: "smooth",
      });
    }
  };

  const { isPrescoringPosted, isOfferChosen } = useAppSelector(
    (state) => state.forms
  );

  return (
    <>
      <ScrollToTop />
      <Layout>
        <main className="container">
          <PlatinumSection
            onApplyClick={
              (isOfferChosen
                ? () => {}
                : isPrescoringPosted
                ? () => scrollToElement(offersSectionRef)
                : () => scrollToElement(formRef)) as () => void
            }
          />
          <TabsSection />
          <HowToGetSection />
          {!isPrescoringPosted && !isOfferChosen && (
            <CustomizeFormSection ref={formRef} />
          )}

          {isPrescoringPosted && !isOfferChosen && (
            <OffersSection ref={offersSectionRef} />
          )}

          {isOfferChosen && (
            <Message
              title="The preliminary decision has been sent to your email."
              text=" In the letter you can get acquainted with the preliminary decision on the credit card."
              withBorder={true}
            />
          )}
        </main>
      </Layout>
    </>
  );
};
