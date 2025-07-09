import { FC } from "react";
import "./Loader.scss";

type TLoaderProps = {
  width?: number;
  height?: number;
};

export const Loader: FC<TLoaderProps> = ({ width = 70, height = 70 }) => {
  return (
    <div style={{ width, height }} className="loader">
      <img src="/Icons/spinner.svg" alt="loader" />
    </div>
  );
};
