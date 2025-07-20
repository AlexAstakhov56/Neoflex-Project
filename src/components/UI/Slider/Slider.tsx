import { FC } from "react";
import "./Slider.scss";

type TSliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export const Slider: FC<TSliderProps> = ({ min, max, value, onChange }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        className="slider"
        list="list"
        style={{
          background: `linear-gradient(to right, #5B35D5 ${
            ((value - min) / (max - min)) * 100
          }%, #E2E8F0 ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      {/* <datalist id="list">
        <option value={min} />
        <option value={max} />
      </datalist> */}
      <div className="slider__values">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </div>
  );
};
