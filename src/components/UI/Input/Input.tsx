import { FC } from "react";
import { Label } from "../../../components";
import "./Input.scss";

type TInputProps = {
  type?: "text" | "number" | "email";
  placeholder: string;
  label: string;
  value: string;
  required: boolean;
  name: string;
  error: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<TInputProps> = ({
  type = "text",
  label,
  value,
  required,
  name,
  placeholder,
  error,
  isValid,
  onChange,
}) => {
  return (
    <div className="Input-container">
      <Label label={label} required={required} />
      <div className="Input__wrapper">
        <input
          type={type}
          value={value}
          className={`Input  ${isValid ? "valid" : ""} ${error ? "error" : ""}`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error ? (
          <img src="/Icons/error_icon.svg" className="Input__icon" />
        ) : isValid ? (
          <img src="/Icons/success_icon.svg" className="Input__icon" />
        ) : null}
        {error && <span className="Input__errorMessage">{error}</span>}
      </div>
    </div>
  );
};
