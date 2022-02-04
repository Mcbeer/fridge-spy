import React, { ReactNode } from "react";
import "./Button.scss";

interface ButtonProps {
  onClick?: (response?: any) => void;
  buttonTheme?: "default" | "login";
  label?: string;
  icon?: ReactNode;
  iconPosition?: "right" | "left";
  type?: "submit" | "button";
}

export const Button = ({
  buttonTheme = "default",
  onClick = () => {},
  label,
  icon,
  iconPosition = "right",
  type = "button",
}: ButtonProps) => {
  const themeClasses = ["Button"];

  return (
    <button className={themeClasses.join(" ")} onClick={onClick} type={type}>
      {iconPosition === "left" && icon}
      <label
        className={
          icon
            ? "ml-2 text-sm pointer-events-none"
            : "text-sm pointer-events-none"
        }
      >
        {label}
      </label>
      {iconPosition === "right" && icon}
    </button>
  );
};
