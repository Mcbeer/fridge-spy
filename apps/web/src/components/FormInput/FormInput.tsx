import React from "react";
import { FieldHookConfig, useField } from "formik";
import "./FormInput.scss";

interface FormInputProps {
  label: string;
}

export const FormInput = ({
  label,
  ...props
}: FormInputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="FormInput">
      <label className="FormInput__label" htmlFor={props.name}>
        {label}
      </label>
      <input {...field} className="FormInput__input" />
      {/* {meta.touched && meta.error && (
        <>
          <FormInputError>
            <RiErrorWarningLine size="1.5rem" data-tip={meta.error} />
          </FormInputError>
          <ReactTooltip effect="solid" type="error" />
        </>
      )} */}
    </div>
  );
};
