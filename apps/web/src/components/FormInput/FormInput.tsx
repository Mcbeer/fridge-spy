import { FieldHookConfig, useField } from "formik";
import React from "react";
import {
  FormInputInput,
  FormInputLabel,
  FormInputWrapper,
} from "./FormInput.styles";

interface FormInputProps {
  label: string;
}

export const FormInput = ({
  label,
  ...props
}: FormInputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <FormInputWrapper>
      <FormInputLabel htmlFor={props.name}>{label}</FormInputLabel>
      <FormInputInput
        {...field}
        {...props}
        touched={meta.touched}
        error={meta.error}
      />
    </FormInputWrapper>
  );
};
