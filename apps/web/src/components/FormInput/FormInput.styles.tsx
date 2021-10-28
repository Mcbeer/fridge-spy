import styled, { ITheme } from "styled-components";

export const FormInputWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 10ch) minmax(0px, 1fr);
  padding: 0.5rem 0;
`;

export const FormInputLabel = styled.label`
  display: flex;
  align-items: center;
`;

interface FormInputInputProps {
  touched: boolean;
  error: string;
}

export const FormInputInput = styled.input<FormInputInputProps>`
  border: none;
  outline: none;
  border: 1px solid
    ${({ touched, error, theme }) => getFormInputColor(touched, error, theme)};
  border-radius: 0.2rem;
  padding: 0.3rem;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const getFormInputColor = (
  touched: boolean,
  error: string,
  theme: ITheme
): string => {
  if (touched && !error) {
    return theme.secondary;
  }

  if (!touched && !error) {
    return theme.primary;
  }

  if (touched && error) {
    return theme.warning;
  }

  return "#000";
};
