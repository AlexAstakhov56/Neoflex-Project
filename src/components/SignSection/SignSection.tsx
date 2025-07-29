import { FC, useState } from "react";
import { Button, Checkbox, Loader, Title } from "../UI";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import axios from "axios";
import { incrementStep } from "../../store/applicationSlice";
import { setSignPosted } from "../../store/formsSlice";
import file from "/credit-card-offer.pdf";
import "./SignSection.scss";

export const SignSection: FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { applicationId } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = file;
    a.download = "credit-card-offer.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePost = async () => {
    setIsLoading(true);
    try {
      const resp = await axios.post(
        `http://localhost:8080/document/${applicationId}/sign`,
        null
      );
      if (resp.status === 200) {
        dispatch(incrementStep());
        dispatch(setSignPosted(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader marginTop={300} marginBottom={300} />;

  return (
    <section className="signSection">
      <div className="signSection__info">
        <Title title="Signing of documents" />
        <p>Step 4 of 5</p>
      </div>
      <p className="signSection__text">
        Information on interest rates under bank deposit agreements with
        individuals. Center for Corporate Information Disclosure. Information of
        a professional participant in the securities market. Information about
        persons under whose control or significant influence the Partner Banks
        are. By leaving an application, you agree to the processing of personal
        data, obtaining information, obtaining access to a credit history, using
        an analogue of a handwritten signature, an offer, a policy regarding the
        processing of personal data, a form of consent to the processing of
        personal data.
      </p>
      <div className="signSection__download" onClick={handleDownload}>
        <img src="/Images/file_image.svg" alt="file" />
        <p>Information on your card</p>
      </div>
      <div className="signSection__submit">
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          text="I agree"
        />
        <Button
          paddingX={60}
          paddingY={11}
          borderRadius={8}
          onClick={handlePost}
          disabled={!isChecked}
        >
          Send
        </Button>
      </div>
    </section>
  );
};
