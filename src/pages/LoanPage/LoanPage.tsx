import { FC, useRef } from "react";
import { Layout } from "../../layout";
import { ScrollToTop } from "../../utils";
import {
  PlatinumSection,
  TabsSection,
  HowToGetSection,
  CustomizeFormSection,
} from "../../components";

export const LoanPage: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      const formPosition =
        formRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: formPosition - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <ScrollToTop />
      <Layout>
        <main className="container">
          <PlatinumSection onApplyClick={scrollToForm} />
          <TabsSection />
          <HowToGetSection />
          <CustomizeFormSection ref={formRef} />
        </main>
      </Layout>
    </>
  );
};
