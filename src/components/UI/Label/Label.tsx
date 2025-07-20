import { FC } from "react";
import "./Label.scss";

type TLabelProps = {
  label: string;
  required?: boolean;
};

export const Label: FC<TLabelProps> = ({ label, required = true }) => {
  return (
    <label className="label">
      {label}
      {required ? <span>*</span> : ""}
    </label>
  );
};
