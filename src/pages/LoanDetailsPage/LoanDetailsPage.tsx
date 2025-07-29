import { FC, useEffect } from "react";
import { Layout } from "../../layout";
import { Message, ScoringForm } from "../../components";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes, RoutePath } from "../../router";

export const LoanDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { isScoringPosted } = useAppSelector((state) => state.forms);
  const { applicationId: reduxApplicationId, currentStep } = useAppSelector(
    (state) => state.application
  );
  const { applicationId: urlApplicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    if (urlApplicationId && reduxApplicationId) {
      const parsedUrlApplicationId = parseInt(urlApplicationId, 10);
      if (parsedUrlApplicationId !== reduxApplicationId) {
        navigate(RoutePath[AppRoutes.NOTFOUND]);
      }
    } else if (!reduxApplicationId && urlApplicationId) {
      navigate(RoutePath[AppRoutes.NOTFOUND]);
    } else if (currentStep < 2) navigate(RoutePath[AppRoutes.NOTFOUND]);
  }, []);

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
