import React, { ReactNode } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { LayoutContent, LayoutMain, LayoutNav } from "./Layout.styles";

interface LayoutInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => (
  <LayoutMain>
    <LayoutNav>
      <Navbar />
    </LayoutNav>
    <LayoutContent>{children}</LayoutContent>
  </LayoutMain>
);
