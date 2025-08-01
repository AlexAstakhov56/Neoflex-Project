import { FC } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Layout } from "../../layout";
import { Message, SignSection } from "../../components";
import { useApplication } from "../../hooks/useApplication";

export const LoanSignPage: FC = () => {
  const { isSignPosted } = useAppSelector((state) => state.forms);
  const { isValid } = useApplication({ minStep: 4 });

  if (!isValid) {
    return null;
  }

  return (
    <Layout>
      <main className="container">
        {isSignPosted ? (
          <Message
            title="Documents have been successfully signed and sent for approval"
            text="Within 10 minutes you will be sent a PIN code to your email for confirmation"
            marginSize="default"
            maxWidth={554}
            textMaxWidth={404}
          />
        ) : (
          <SignSection />
        )}
      </main>
    </Layout>
  );
};
