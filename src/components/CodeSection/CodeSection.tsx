import { FC } from "react";
import "./CodeSection.scss";
import { CodeInput, Title } from "../UI";

type TCodeSectionProps = {
  isValidCode: boolean;
  onChange: (newCode: string) => void;
};

export const CodeSection: FC<TCodeSectionProps> = ({
  isValidCode,
  onChange,
}) => {
  return (
    <section className="codeSection">
      <Title title="Please enter confirmation code" />
      <div>
        <CodeInput length={4} isValid={isValidCode} onChange={onChange} />
      </div>
    </section>
  );
};
