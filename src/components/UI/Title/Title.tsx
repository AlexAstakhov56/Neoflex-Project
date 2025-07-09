import { FC } from "react";
import clsx from "clsx";
import "./Title.scss";

type TTitleProps = {
  title: string;
  fontSize?: "small" | "default" | "large";
  color?: string;
  fontWeight?: number;
  isCentered?: boolean;
  marginTop?: number;
  marginBottom?: number;
};

export const Title: FC<TTitleProps> = ({
  title,
  fontSize = "default",
  color = "#000",
  fontWeight = 700,
  isCentered = false,
  marginTop = 0,
  marginBottom = 0,
}) => {
  const titleClass = clsx("title", {
    small: fontSize === "small",
    default: fontSize === "default",
    large: fontSize === "large",
    centered: isCentered,
  });

  return (
    <h2
      className={titleClass}
      style={{ color, fontWeight, marginTop, marginBottom }}
    >
      {title}
    </h2>
  );
};
