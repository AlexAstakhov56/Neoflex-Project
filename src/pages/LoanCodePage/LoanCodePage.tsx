import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { AppRoutes, RoutePath } from "../../router";
import { Layout } from "../../layout";
import { CodeSection, Loader, Message } from "../../components";
import axios from "axios";
import { setCodePosted } from "../../store/formsSlice";

export const LoanCodePage: FC = () => {
  const navigate = useNavigate();
  const [isValidCode, setIsValidCode] = useState(true);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { isCodePosted } = useAppSelector((state) => state.forms);
  const {
    applicationId: reduxApplicationId,
    code,
    currentStep,
  } = useAppSelector((state) => state.application);
  const { applicationId: urlApplicationId } = useParams<{
    applicationId: string;
  }>();

  const handleCodeChange = async (newCode: string) => {
    const isValidCode = newCode === code;
    setIsValidCode(isValidCode);
    if (isValidCode) {
      setIsLoading(true);
      try {
        const resp = await axios.post(
          `http://localhost:8080/document/${reduxApplicationId}/sign/code`,
          code,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (resp.status === 200) {
          dispatch(setCodePosted(true));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (urlApplicationId && reduxApplicationId) {
      const parsedUrlApplicationId = parseInt(urlApplicationId, 10);
      if (parsedUrlApplicationId !== reduxApplicationId) {
        navigate(RoutePath[AppRoutes.NOTFOUND]);
      }
    } else if (!reduxApplicationId && urlApplicationId) {
      navigate(RoutePath[AppRoutes.NOTFOUND]);
    } else if (currentStep < 5) navigate(RoutePath[AppRoutes.NOTFOUND]);
  }, [urlApplicationId, reduxApplicationId]);

  if (isLoading) return <Loader marginTop={150} marginBottom={100} />;

  return (
    <Layout>
      <main className="container">
        {isCodePosted ? (
          <Message
            title="Congratulations! You have completed your new credit card."
            text="Your credit card will arrive soon. Thank you for choosing us!"
            withImageAndButton={true}
            buttonText="View other offers of our bank"
          />
        ) : (
          <CodeSection isValidCode={isValidCode} onChange={handleCodeChange} />
        )}
      </main>
    </Layout>
  );
};
