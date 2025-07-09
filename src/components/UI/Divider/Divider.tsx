import { FC } from "react";

type TDividerProps = {
  width: number;
  height: number;
  backgroundColor: string;
};

export const Divider: FC<TDividerProps> = ({
  width,
  height,
  backgroundColor,
}) => {
  return (
    <div
      style={{
        maxWidth: width,
        width: "100%",
        height: height,
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
};
