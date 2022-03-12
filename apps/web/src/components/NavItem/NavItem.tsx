import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./NavItem.scss";

interface NavItemProps {
  children: ReactNode;
  linkTo: string;
  icon: ReactNode;
}

export const NavItem = ({ children, icon, linkTo }: NavItemProps) => (
  <li className="NavItem">
    <Link to={linkTo} className="NavItem__link">
      <span className="NavItem__link-icon">{icon}</span>
      <p className="NavItem__link-text">{children}</p>
    </Link>
  </li>
);
