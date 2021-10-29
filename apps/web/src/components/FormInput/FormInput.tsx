import { FieldHookConfig, useField } from "formik";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import {
  FormInputError,
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
      {meta.touched && meta.error && (
        <>
          <FormInputError>
            <RiErrorWarningLine size="1.5rem" data-tip={meta.error} />
          </FormInputError>
          <ReactTooltip effect="solid" type="error" />
        </>
      )}
    </FormInputWrapper>
  );
};
