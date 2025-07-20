import { FC } from "react";
import "./Loader.scss";

type TLoaderProps = {
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
};

export const Loader: FC<TLoaderProps> = ({
  width = 70,
  height = 70,
  marginTop = 15,
  marginBottom = 15,
}) => {
  return (
    <div style={{ width, height, marginBottom, marginTop }} className="loader">
      <img src="/Icons/spinner.svg" alt="loader" />
    </div>
  );
};
