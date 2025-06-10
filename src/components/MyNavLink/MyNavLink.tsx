import { FC } from "react";
import { NavLink } from "react-router-dom";
import cl from "./MyNavLink.module.scss";

interface MyNavLinkProps {
  text: string;
  link: string;
}

const MyNavLink: FC<MyNavLinkProps> = ({ link, text }) => {
  return (
    <NavLink
      className={({ isActive }) => `${cl.link} ${isActive ? cl.active : ""}`}
      to={link}
    >
      {text}
    </NavLink>
  );
};

export default MyNavLink;
