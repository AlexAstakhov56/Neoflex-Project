import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  isRed?: boolean;
}

const Button: FC<ButtonProps> = ({ text, isRed = false }) => {
  return <button className={isRed ? "btn btn-red" : "btn"}>{text}</button>;
};

export default Button;
