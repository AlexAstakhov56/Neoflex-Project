import { Label } from "../../../components";
import "./Select.scss";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

type TSelectProps<
  TForm extends Record<string, any>,
  TFieldName extends Path<TForm>
> = {
  label: string;
  minWidth?: number;
  required: boolean;
  optionsData: readonly number[] | readonly string[];
  extraWord?: string;
  name: TFieldName;
  defaultValue?: number | string;
  register: UseFormRegister<TForm>;
  error?: FieldError;
};

export const Select = <
  TForm extends Record<string, any>,
  TFieldName extends Path<TForm>
>({
  label,
  minWidth = 297,
  required,
  optionsData,
  extraWord = "",
  name,
  defaultValue = "",
  register,
  error,
}: TSelectProps<TForm, TFieldName>) => {
  return (
    <div className="select-container" style={{ minWidth }}>
      <Label label={label} required={required} />
      <div className="select">
        <select
          className={`select__dropdown ${error ? "error" : ""}`}
          {...register(name, { required: required })}
          aria-invalid={!!error}
          defaultValue={defaultValue}
        >
          {defaultValue === "" && <option value="" disabled hidden></option>}
          {optionsData.map((opt) => (
            <option key={opt} value={opt}>
              {opt} {extraWord}
            </option>
          ))}
        </select>
        {error && <span className="select__errorMessage">{error.message}</span>}
      </div>
    </div>
  );
};
