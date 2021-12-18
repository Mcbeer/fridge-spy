import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  children: ReactNode;
  linkTo: string;
  icon: ReactNode;
}

export const NavItem = ({ children, icon, linkTo }: NavItemProps) => (
  <li
    className="h-20 w-20 text-cyan-100 flex justify-center items-center flex-col cursor-pointer transition-colors
  bg-inherit m-2 rounded-md text-left hover:bg-teal-500"
  >
    <Link
      to={linkTo}
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <span className="block">{icon}</span>
      <p className="block relative text-center">{children}</p>
    </Link>
  </li>
);
