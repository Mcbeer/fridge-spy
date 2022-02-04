import React, { FunctionComponent } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Layout.scss";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="Layout">
      <Navbar />
      <div className="Layout__content">{children}</div>
    </main>
  );
};
