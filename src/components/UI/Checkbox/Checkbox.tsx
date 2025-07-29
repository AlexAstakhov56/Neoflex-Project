import { ChangeEvent, FC } from "react";
import "./Checkbox.scss";

type TCheckboxProps = {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: FC<TCheckboxProps> = ({ text, checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="checkbox"
      />
      <span className="checkbox__check"></span>
      {text}
    </label>
  );
};
