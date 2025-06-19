import { FC, ReactNode } from "react";
import "./Button.scss";
import clsx from "clsx";

type TButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  buttonType?: "default" | "warning" | "subscribe";
};

export const Button: FC<TButtonProps> = ({
  children,
  type = "button",
  buttonType = "default",
}) => {
  const buttonClass = clsx(
    "btn",
    buttonType === "default" && "default",
    buttonType === "warning" && "warning",
    buttonType === "subscribe" && "subscribe__button"
  );
  return (
    <button type={type} className={buttonClass}>
      {children}
    </button>
  );
};
