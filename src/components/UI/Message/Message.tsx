import { FC } from "react";
import "./Message.scss";
import { Title, Button } from "..";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { resetFormsState } from "../../../store/formsSlice";
import clsx from "clsx";
import { resetApplicationState } from "../../../store/applicationSlice";
import { useNavigate } from "react-router-dom";

type TMessageProps = {
  title: string;
  text: string;
  withBorder?: boolean;
  marginSize?: "small" | "default";
  maxWidth?: number;
  textMaxWidth?: number;
  withImageAndButton?: boolean;
  buttonText?: string;
};

export const Message: FC<TMessageProps> = ({
  title,
  text,
  withBorder = false,
  maxWidth = "100%",
  textMaxWidth = "100%",
  marginSize = "",
  withImageAndButton = false,
  buttonText = "",
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/");
    dispatch(resetFormsState());
    dispatch(resetApplicationState());
  };

  const messageClass = clsx("message", {
    border: withBorder === true,
    small: marginSize === "small",
    default: marginSize === "default",
  });

  return (
    <div
      className={messageClass}
      style={{ maxWidth, marginLeft: "auto", marginRight: "auto" }}
    >
      {withImageAndButton && (
        <img src="/Images/OfferCardImage.png" alt="congrats" />
      )}
      <Title title={title} />
      <p
        style={{
          maxWidth: textMaxWidth,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {text}
      </p>
      {withImageAndButton && (
        <div className="message__button">
          <Button onClick={handleReset}>{buttonText}</Button>
        </div>
      )}
    </div>
  );
};
