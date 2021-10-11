import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";
import { updateBrand } from "../../database/brand/updateBrand";
import { formatDBBrandToBrand } from "./formatBrand";

interface PutBrandArgs {
  id: string;
  name: string;
}

export const putBrand = async (req: Request, res: Response): Promise<void> => {
  const body = getRequestBody<PutBrandArgs>(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(putBrandSchema, body)
  );

  if (inputValidationError) {
    respond(res).error(inputValidationError, 422);
    return;
  }

  if (!inputValidity) {
    respond(res).error(new Error("Input is invalid"));
    return;
  }

  const [updateError, updatedBrand] = await perhaps(updateBrand(body));

  if (updateError) {
    respond(res).error(updateError);
    return;
  }

  if (!updatedBrand) {
    respond(res).error(new Error("Brand not updated, unknown error"));
    return;
  }

  const formattedBrand = formatDBBrandToBrand(updatedBrand);

  respond(res).success(formattedBrand);
};

const putBrandSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
});
