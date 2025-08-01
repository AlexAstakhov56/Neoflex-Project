import { FC } from "react";
import { Layout } from "../../layout";
import { Message, ScoringForm } from "../../components";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useApplication } from "../../hooks/useApplication";

export const LoanDetailsPage: FC = () => {
  const { isScoringPosted } = useAppSelector((state) => state.forms);
  const { isValid } = useApplication({ minStep: 2 });

  if (!isValid) {
    return null;
  }

  return (
    <Layout>
      <main className="container">
        {isScoringPosted ? (
          <Message
            title="Wait for a decision on the application"
            text="The answer will come to your mail within 10 minutes"
            marginSize="default"
          />
        ) : (
          <ScoringForm />
        )}
      </main>
    </Layout>
  );
};
