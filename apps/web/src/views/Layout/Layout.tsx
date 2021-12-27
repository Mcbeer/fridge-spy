import React, { FunctionComponent } from "react";
import { Navbar } from "../../components/Navbar/Navbar";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="absolute inset-0 grid grid-cols-[8rem_1fr] bg-teal-100, overflow-hidden bg-slate-100">
      <Navbar />
      <div className="p-4 overflow-hidden h-full">{children}</div>
    </main>
  );
};
