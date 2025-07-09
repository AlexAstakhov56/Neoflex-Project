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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(optionsData[0]);

  const handleSelect = (option: number) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="Select-container">
      <Label label={label} required={required} />
      <div className="Select">
        <div
          className={`Select__trigger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <img
            src="/Icons/accordion_arrow.svg"
            alt="arrow"
            className="Select__arrow"
          />
        </div>
        {isOpen && (
          <div className="Select__options">
            {optionsData.map((opt) => (
              <div
                key={opt}
                className="Select__option"
                onClick={() => handleSelect(opt)}
              >
                {opt} {extraWord}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
