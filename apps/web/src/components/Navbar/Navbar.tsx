import React from "react";
import { NavItem } from "../NavItem/NavItem";
import {
  AiOutlineHome,
  AiOutlineDashboard,
  AiOutlineOrderedList,
} from "react-icons/ai";

export const Navbar = () => (
  <nav className="bg-teal-700 rounded-2xl py-16 m-4">
    <ul className="list-none flex flex-col gap-4 justify-evenly h-full">
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
