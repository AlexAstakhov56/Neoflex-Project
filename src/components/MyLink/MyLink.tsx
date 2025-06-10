import { FC } from "react";
import cl from "./MyLink.module.scss";

interface MyLinkProps {
  text: string;
  link: string;
}

const MyLink: FC<MyLinkProps> = ({ text, link }) => {
  return (
    <div>
      <a className={cl.link} href={link}>
        {text}
      </a>
    </div>
  );
};

export default MyLink;
