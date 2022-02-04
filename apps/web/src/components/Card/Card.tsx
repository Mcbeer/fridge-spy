import React, { FunctionComponent } from "react";
import "./Card.scss";

export const Card: FunctionComponent = ({ children }) => (
  <div className="Card">{children}</div>
);
