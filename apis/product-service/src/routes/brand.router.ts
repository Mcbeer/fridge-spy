import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { addBrand } from "../lib/brand/addBrand";
import { getBrandById } from "../lib/brand/getBrandById";
import { getBrands } from "../lib/brand/getBrands";
import { putBrand } from "../lib/brand/putBrand";
import { removeBrand } from "../lib/brand/removeBrand";

export const brandRouter = (): Router => {
  const brandRouter = Router();

  brandRouter.use(authMiddleware);

  // Get a specific brand
  brandRouter.get("/:id", getBrandById);

  // Get aall brand
  brandRouter.get("/", getBrands);

  // Add a brand
  brandRouter.post("/", addBrand);

  // Update a brand
  brandRouter.put("/", putBrand);

  // Delete a brand
  brandRouter.delete("/:id", removeBrand);

  return brandRouter;
};
