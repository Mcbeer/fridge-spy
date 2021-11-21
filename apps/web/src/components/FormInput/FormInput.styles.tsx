import styled, { ITheme } from "styled-components";

export const FormInputWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 10ch) minmax(0px, 1fr);
  padding: 0.5rem 0;
  position: relative;
`;

export const FormInputLabel = styled.label`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 10ch;
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
  border-radius: 0.4rem;
  padding: 0.5rem;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const FormInputError = styled.div`
  position: absolute;
  right: 0.6rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
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
