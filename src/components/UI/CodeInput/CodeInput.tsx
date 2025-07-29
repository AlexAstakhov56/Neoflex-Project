import { FC, useEffect, useRef, useState } from "react";
import "./CodeInput.scss";

interface CodeInputProps {
  length: number;
  onChange: (code: string) => void;
  isValid: boolean;
}

export const CodeInput: FC<CodeInputProps> = ({
  length,
  onChange,
  isValid,
}) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length > 1) return;

    const newCode = [...code];
    newCode[index] = newValue;
    setCode(newCode);

    if (newCode.join("").length === length) onChange(newCode.join(""));

    if (newValue && index < length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleInputKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        handleInputChange(index - 1, "");
      }
    }
  };

  useEffect(() => {
    inputRefs.current = Array(length).fill(null);
  }, [length]);

  return (
    <>
      <div className="codeInput-container">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="codeInput-wrapper">
            <input
              key={index}
              type="text"
              maxLength={1}
              className={`codeInput ${code[index] !== "" ? "filled" : ""}`}
              value={code[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              autoFocus={index === 0}
            />
            {code[index] === "" && (
              <div className="codeInput__placeholder"></div>
            )}
          </div>
        ))}
        {!isValid && (
          <div className="codeInput__error">Invalid confirmation code</div>
        )}
      </div>
    </>
  );
};
