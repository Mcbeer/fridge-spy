import { FieldHookConfig, useField } from "formik";
import React from "react";

interface FormInputProps {
  label: string;
}

export const FormInput = ({
  label,
  ...props
}: FormInputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="grid grid-cols-[minmax(0,_10ch)_minmax(0,_1fr)] py-2 relative">
      <label
        className="flex items-center whitespace-nowrap overflow-hidden overflow-ellipsis w-[10ch]"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        {...field}
        className="border-0 outline-none p-2 text-base focus:border-slate-700 border-b-2"
      />
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
