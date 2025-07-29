import { Label } from "../../../components";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import "./Input.scss";

type TFormValues = string | number | boolean | null | undefined | Date;

type TInputProps<
  TForm extends Record<string, TFormValues>,
  TFieldName extends Path<TForm>
> = {
  type?: "text" | "number" | "email" | "date";
  minWidth?: number;
  placeholder: string;
  label: string;
  required: boolean;
  name: TFieldName;
  maxLength?: number;
  error?: FieldError;
  isValid: boolean;
  register: UseFormRegister<TForm>;
};

export const Input = <
  TForm extends Record<string, TFormValues>,
  TFieldName extends Path<TForm>
>({
  type = "text",
  minWidth = 297,
  label,
  required,
  name,
  placeholder,
  error,
  isValid,
  register,
  maxLength = 40,
}: TInputProps<TForm, TFieldName>) => {
  return (
    <div className="input-container" style={{ minWidth }}>
      <Label label={label} required={required} />
      <div className="input__wrapper">
        <input
          type={type}
          maxLength={maxLength}
          className={`input  ${isValid ? "valid" : ""} ${error ? "error" : ""}`}
          placeholder={placeholder}
          {...register(name)}
          aria-invalid={!!error}
        />
        {error && type !== "date" ? (
          <img src="/Icons/error_icon.svg" className="input__icon" />
        ) : isValid && type !== "date" ? (
          <img src="/Icons/success_icon.svg" className="input__icon" />
        ) : null}
        {error && <span className="input__errorMessage">{error.message}</span>}
      </div>
    </div>
  );
};
