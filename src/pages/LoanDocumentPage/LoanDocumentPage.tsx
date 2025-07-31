import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { AppRoutes, RoutePath } from "../../router";
import { Layout } from "../../layout";
import { DocumentForm, Message } from "../../components";
import axios from "axios";

export type TPayment = {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
};

export const LoanDocumentPage: FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<TPayment[]>([]);
  const { isDocumentPosted } = useAppSelector((state) => state.forms);
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
        return;
      }
    } else if (!reduxApplicationId && urlApplicationId) {
      navigate(RoutePath[AppRoutes.NOTFOUND]);
      return;
    } else if (currentStep < 3) {
      navigate(RoutePath[AppRoutes.NOTFOUND]);
      return;
    }

    const fetchApplicationData = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8080/admin/application/${reduxApplicationId}`
        );
        if (resp.data) {
          const { credit } = resp.data;
          const { paymentSchedule } = credit;
          setPaymentData(paymentSchedule);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (reduxApplicationId) {
      fetchApplicationData();
    }
  }, [urlApplicationId, reduxApplicationId, currentStep]);
  return (
    <Layout>
      <main className="container">
        {isDocumentPosted ? (
          <Message
            title="Documents are formed"
            text="Documents for signing will be sent to your email"
            marginSize="default"
          />
        ) : (
          <DocumentForm paymentData={paymentData} />
        )}
      </main>
    </Layout>
  );
};
