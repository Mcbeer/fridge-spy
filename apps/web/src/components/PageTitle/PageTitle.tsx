import React, { FunctionComponent } from "react";

export const PageTitle: FunctionComponent = ({ children }) => (
  <h1 className="text-2xl text-teal-900 font-bold items-center border-slate-500 border-b-1 relative border-solid">
    {children}
  </h1>
);
