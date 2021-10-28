import { lighten } from "polished";
import styled from "styled-components";

interface IButtonStyles {
  theme: string;
  backgroundColor: string;
  color: string;
}

interface StyledButtonProps {
  buttonTheme: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ buttonTheme }) =>
    buttonStyles.find((styles) => styles.theme === buttonTheme)
      ?.backgroundColor};
  color: ${({ buttonTheme }) =>
    buttonStyles.find((styles) => styles.theme === buttonTheme)?.color};
  outline: none;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 0.3rem 1rem;
  transition: background-color 100ms ease-in-out;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => lighten(0.4, theme.primary)};
  }

  &:active {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

export const StyledButtonLabel = styled.label``;

export const buttonStyles: IButtonStyles[] = [
  {
    theme: "default",
    backgroundColor: "#fff",
    color: "#000",
  },
];
