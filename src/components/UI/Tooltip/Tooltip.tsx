import { FC, ReactNode, useState } from "react";
import "./Tooltip.scss";

type TTooltipProps = {
  text: string;
  children: ReactNode;
};

export const Tooltip: FC<TTooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <span className="tooltip">{text}</span>}
    </div>
  );
};
