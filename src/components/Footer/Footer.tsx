import { FC } from "react";
import { FooterLink } from "../";
import "./Footer.scss";
import { TLink } from "../../types/TLink.type";

const links: TLink[] = [
  {
    text: "About bank",
    link: "#",
  },
  {
    text: "Ask a Question",
    link: "#",
  },
  {
    text: "Quality of service",
    link: "#",
  },
  {
    text: "Requisites",
    link: "#",
  },
  {
    text: "Press center",
    link: "#",
  },
  {
    text: "Bank career",
    link: "#",
  },
  {
    text: "Investors",
    link: "#",
  },
  {
    text: "Analytics",
    link: "#",
  },
  {
    text: "Business and processes",
    link: "#",
  },
  {
    text: "Compliance and business ethics",
    link: "#",
  },
];

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <section className="container">
        <div className="footer__info">
          <div className="footer__logo">
            <img src="/Images/logo.svg" alt="logo" />
          </div>
          <div>
            <h3 className="footer__tel">+7 (495) 984 25 13</h3>
            <p className="footer__mail">info@neoflex.ru</p>
          </div>
        </div>

        <div className="footer__links">
          {links.map((link) => (
            <FooterLink key={link.text} link={link.link} text={link.text} />
          ))}
        </div>

        <div className="footer__divider"></div>

        <p className="footer__cookies">
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </p>
      </section>
    </footer>
  );
};
