import React, { ReactNode } from "react";

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
  const themeClasses = [""];

  return (
    <button
      className="flex justify-center items-center px-3 py-1 bg-teal-700 text-teal-100 outline-none rounded-md border-1 border-teal-700 border-solid font-bold transition-colors hover:bg-teal-600 active:bg-teal-500"
      onClick={onClick}
      type={type}
    >
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
