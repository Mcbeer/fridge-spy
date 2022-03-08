import React from "react";
import { NavItem } from "../NavItem/NavItem";
import {
  AiOutlineHome,
  AiOutlineDashboard,
  AiOutlineOrderedList,
} from "react-icons/ai";

export const Navbar = () => (
  <nav className="Navbar">
    <ul className="Navbar__list">
      <NavItem icon={<AiOutlineDashboard size="2rem" />} linkTo="/overview">
        Overblik
      </NavItem>
      <NavItem icon={<AiOutlineHome size="2rem" />} linkTo="/">
        Hjem
      </NavItem>
      <NavItem icon={<AiOutlineOrderedList size="2rem" />} linkTo="/shopping">
        Indkøb
      </NavItem>
    </ul>
  </nav>
);
