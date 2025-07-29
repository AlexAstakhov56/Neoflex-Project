import { FC, useState } from "react";
import "./DocumentForm.scss";
import { Button, Checkbox, Loader, Table, Title } from "../UI";
import { TPayment } from "../../pages/LoanDocumentPage/LoanDocumentPage";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { incrementStep } from "../../store/applicationSlice";
import { setDocumentPosted } from "../../store/formsSlice";
import { DenyApplicationModal } from "../DenyApplicationModal";

type TDocumentFormProps = {
  paymentData: TPayment[];
};

const headers = [
  "number",
  "date",
  "total payment",
  "interest payment",
  "debt payment",
  "remaining debt",
];

export const DocumentForm: FC<TDocumentFormProps> = ({ paymentData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { applicationId } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);

  const handlePost = async () => {
    setIsLoading(true);
    try {
      const resp = await axios.post(
        `http://localhost:8080/document/${applicationId}`,
        null
      );
      if (resp.status === 200) {
        dispatch(incrementStep());
        dispatch(setDocumentPosted(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader marginTop={300} marginBottom={300} />;

  return (
    <section className="documentForm">
      <div className="documentForm__info">
        <Title title="Payment Schedule" />
        <p>Step 3 of 5</p>
      </div>
      <Table data={paymentData} headers={headers} />
      <div className="documentForm__submitSection">
        <Button
          paddingY={11}
          paddingX={29}
          onClick={() => setIsDenyModalOpen(true)}
          borderRadius={8}
          buttonType="deny"
        >
          Deny
        </Button>
        <div className="documentForm__sendSection">
          <Checkbox
            text="I agree with the payment schedule"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <Button
            disabled={!isChecked}
            paddingY={11}
            paddingX={29}
            borderRadius={8}
            onClick={handlePost}
          >
            Send
          </Button>
        </div>
      </div>
      <DenyApplicationModal
        isOpen={isDenyModalOpen}
        onClose={() => setIsDenyModalOpen(false)}
      />
    </section>
  );
};
