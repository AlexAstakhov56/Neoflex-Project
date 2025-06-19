import { FC } from "react";
import "./FooterLink.scss";
import { TLink } from "../../types/TLink.type";

type TFooterLinkProps = TLink;

export const FooterLink: FC<TFooterLinkProps> = ({ text, link }) => {
  return (
    <a className="footer__link" href={link}>
      {text}
    </a>
  );
};
