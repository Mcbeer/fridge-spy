import * as Yup from "yup";

/** Export Yup as a named export, god i hate default exports */
export { Yup as yup };

/** A wrapper around the validation library of choice */
export const validateSchema = async <T>(
  schema: Yup.AnySchema,
  obj: T
): Promise<boolean> => {
  return await schema.isValid(obj);
};
