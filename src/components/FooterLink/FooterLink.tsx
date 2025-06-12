import { FC } from "react";
import "./FooterLink.scss";

interface MyLinkProps {
  text: string;
  link: string;
}

const MyLink: FC<MyLinkProps> = ({ text, link }) => {
  return (
    <a className="footer__link" href={link}>
      {text}
    </a>
  );
};

export default MyLink;
