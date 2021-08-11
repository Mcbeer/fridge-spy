import * as Yup from "yup";

export { Yup as yup };

export const validateSchema = async <T>(
  schema: Yup.AnySchema,
  obj: T
): Promise<boolean> => {
  return await schema.isValid(obj);
};
