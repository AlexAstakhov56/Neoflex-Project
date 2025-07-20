import { FC } from "react";
import { Label } from "../../../components";
import "./Input.scss";
import { FieldError, UseFormRegister } from "react-hook-form";

type TInputProps = {
  type?: "text" | "number" | "email";
  placeholder: string;
  label: string;
  required: boolean;
  name: string;
  error?: FieldError;
  isValid: boolean;
  register: UseFormRegister<any>;
};

export const Input: FC<TInputProps> = ({
  type = "text",
  label,
  required,
  name,
  placeholder,
  error,
  isValid,
  register,
}) => {
  return (
    <div className="input-container">
      <Label label={label} required={required} />
      <div className="input__wrapper">
        <input
          type={type}
          className={`input  ${isValid ? "valid" : ""} ${error ? "error" : ""}`}
          placeholder={placeholder}
          {...register(name)}
          aria-invalid={!!error}
        />
        {error ? (
          <img src="/Icons/error_icon.svg" className="input__icon" />
        ) : isValid ? (
          <img src="/Icons/success_icon.svg" className="input__icon" />
        ) : null}
        {error && <span className="input__errorMessage">{error.message}</span>}
      </div>
    </div>
  );
};
