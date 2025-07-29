import { FC, ReactNode } from "react";
import "./Button.scss";
import clsx from "clsx";

type TButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  buttonType?: "default" | "deny" | "subscribe";
  borderRadius?: number;
  disabled?: boolean;
  paddingX?: number;
  paddingY?: number;
  onClick?: () => void;
};

export const Button: FC<TButtonProps> = ({
  children,
  type = "button",
  buttonType = "default",
  borderRadius = 16,
  disabled = false,
  paddingX = 16,
  paddingY = 16,
  onClick,
}) => {
  const buttonClass = clsx("btn", {
    default: buttonType === "default",
    deny: buttonType === "deny",
    subscribe__button: buttonType === "subscribe",
  });
  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
      style={{
        borderRadius,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
    >
      {children}
    </button>
  );
};
