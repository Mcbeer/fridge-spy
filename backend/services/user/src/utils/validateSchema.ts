import { yup } from "./exportYup";

export const validateSchema = async <T>(
  schema: yup.AnySchema,
  obj: T
): Promise<boolean> => {
  return await schema.isValid(obj);
};
