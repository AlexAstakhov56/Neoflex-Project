import { FC } from "react";
import MyNavLink from "../../components/MyNavLink/MyNavLink";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { ILink } from "../../types/Link.interface";

const links: ILink[] = [
  {
    text: "Credit card",
    link: "/loan",
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

const Header: FC = () => {
  return (
    <header className="header">
      <section className="container header__wrapper">
        <h3 className="header__logo">
          <NavLink to="/">NeoBank</NavLink>
        </h3>

        <nav className="header__nav">
          {links.map((link) => (
            <MyNavLink key={link.link} link={link.link} text={link.text} />
          ))}
        </nav>

        <div className="header__button">
          <Button text="Online Bank" />
        </div>
      </section>
    </header>
  );
};

export default Header;
