import React, { FunctionComponent } from "react";
import "./PageTitle.scss";

export const PageTitle: FunctionComponent = ({ children }) => (
  <h1 className="PageTitle">{children}</h1>
);
