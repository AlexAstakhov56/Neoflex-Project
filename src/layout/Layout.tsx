import { FC, ReactNode } from "react";
import { Header, Footer } from "../components";

type TLayoutProps = {
  children: ReactNode;
};

export const Layout: FC<TLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
