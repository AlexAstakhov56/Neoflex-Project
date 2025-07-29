import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { AppRoutes, RoutePath } from "../../router";
import { Layout } from "../../layout";
import { Message, SignSection } from "../../components";

export const LoanSignPage: FC = () => {
  const navigate = useNavigate();
  const { isSignPosted } = useAppSelector((state) => state.forms);
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
    } else if (currentStep < 4) navigate(RoutePath[AppRoutes.NOTFOUND]);
  }, [urlApplicationId, reduxApplicationId]);

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
