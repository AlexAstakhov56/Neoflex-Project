import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Layout } from "../../layout";
import { DocumentForm, Message } from "../../components";
import axios from "axios";
import { useApplication } from "../../hooks/useApplication";

export type TPayment = {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
};

export const LoanDocumentPage: FC = () => {
  const [paymentData, setPaymentData] = useState<TPayment[]>([]);
  const { isDocumentPosted } = useAppSelector((state) => state.forms);

  const { isValid } = useApplication({
    minStep: 3,
    fetchFn: async (applicationId) => {
      const resp = await axios.get(
        `http://localhost:8080/admin/application/${applicationId}`
      );
      const { credit } = resp.data;
      setPaymentData(credit.paymentSchedule);
    },
  });

  if (!isValid) {
    return null;
  }

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
