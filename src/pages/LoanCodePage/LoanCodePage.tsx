import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Layout } from "../../layout";
import { CodeSection, Loader, Message } from "../../components";
import axios from "axios";
import { setCodePosted } from "../../store/formsSlice";
import { setCode } from "../../store/applicationSlice";
import { useApplication } from "../../hooks/useApplication";

export const LoanCodePage: FC = () => {
  const [isValidCode, setIsValidCode] = useState(true);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { isCodePosted } = useAppSelector((state) => state.forms);
  const { applicationId, code } = useAppSelector((state) => state.application);

  const handleCodeChange = async (newCode: string) => {
    const isValidCode = newCode === code;
    setIsValidCode(isValidCode);
    if (isValidCode) {
      setIsLoading(true);
      try {
        const resp = await axios.post(
          `http://localhost:8080/document/${applicationId}/sign/code`,
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

  const { isValid } = useApplication({
    minStep: 5,
    fetchFn: async (applicationId) => {
      const resp = await axios.get(
        `http://localhost:8080/admin/application/${applicationId}`
      );
      const { sesCode } = resp.data;
      dispatch(setCode(String(sesCode)));
    },
  });

  if (!isValid) {
    return null;
  }

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
