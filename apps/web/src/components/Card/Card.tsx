import React, { FunctionComponent } from "react";

export const Card: FunctionComponent = ({ children }) => (
  <div className="rounded-xl bg-white shadow-md p-4">{children}</div>
);
