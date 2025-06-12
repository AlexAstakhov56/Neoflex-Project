import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./CustomNavLink.scss";

interface CustomNavLinkProps {
  text: string;
  link: string;
}

const CustomNavLink: FC<CustomNavLinkProps> = ({ link, text }) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
      to={link}
    >
      {text}
    </NavLink>
  );
};

export default CustomNavLink;
