import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { NavItemIcon, NavItemLabel } from "./NavItem.styles";
import { NavItemBase } from "./NavItem.styles";

interface NavItemProps {
  children: ReactNode;
  linkTo: string;
  icon: ReactNode;
}

export const NavItem = ({ children, icon, linkTo }: NavItemProps) => (
  <NavItemBase>
    <Link to={linkTo}>
      <NavItemIcon>{icon}</NavItemIcon>
      <NavItemLabel>{children}</NavItemLabel>
    </Link>
  </NavItemBase>
);
