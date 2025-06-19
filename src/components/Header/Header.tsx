import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { RoutePath } from "../../router";
import { Button, CustomNavLink } from "../";
import { TLink } from "../../types/TLink.type";

export const Header: FC = () => {
  const links: TLink[] = [
    {
      text: "Credit card",
      link: RoutePath.LOAN,
    },
    {
      text: "Product",
      link: "/product",
    },
    {
      text: "Account",
      link: "/account",
    },
    {
      text: "Resourses",
      link: "/resourses",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <header className="header">
      <section className="container header__wrapper">
        <h3 className="header__logo">
          <NavLink to={RoutePath.HOME}>NeoBank</NavLink>
        </h3>

        <button
          className={`burger-button ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <div></div>
        </button>

        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <CustomNavLink key={link.link} link={link.link} text={link.text} />
          ))}
          <Button>Online Bank</Button>
        </nav>
      </section>
    </header>
  );
};
