import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./CustomNavLink.scss";
import { TLink } from "../../types/TLink.type";

type TCustomNavLinkProps = TLink;

export const CustomNavLink: FC<TCustomNavLinkProps> = ({ link, text }) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
      to={link}
    >
      {text}
    </NavLink>
  );
};
