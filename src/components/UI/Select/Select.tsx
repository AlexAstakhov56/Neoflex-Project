import { FC, useState } from "react";
import { Label } from "../../../components";
import "./Select.scss";

type TSelectProps = {
  label: string;
  required: boolean;
  optionsData: number[];
  extraWord?: string;
  onSelect: (value: number) => void;
};

export const Select: FC<TSelectProps> = ({
  label,
  required,
  optionsData,
  extraWord = "",
  onSelect,
}) => {
  const [selected, setSelected] = useState(optionsData[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = +event.target.value;
    setSelected(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <div className="select-container">
      <Label label={label} required={required} />
      <div className="select">
        <select
          className="select__dropdown"
          value={selected}
          onChange={handleChange}
        >
          {optionsData.map((opt) => (
            <option key={opt} value={opt}>
              {opt} {extraWord}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
