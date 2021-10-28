import React, { ReactNode } from "react";
import { StyledButton, StyledButtonLabel } from "./Button.styles";

interface ButtonProps {
  onClick: (response?: any) => void;
  buttonTheme?: "default" | "login";
  label?: string;
  icon?: ReactNode;
  iconPosition?: "right" | "left";
  type?: "submit" | "button";
}

export const Button = ({
  buttonTheme = "default",
  onClick,
  label,
  icon,
  iconPosition = "right",
  type = "button",
}: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} buttonTheme={buttonTheme} type={type}>
      {iconPosition === "left" && icon}
      <StyledButtonLabel>{label}</StyledButtonLabel>
      {iconPosition === "right" && icon}
    </StyledButton>
  );
};
