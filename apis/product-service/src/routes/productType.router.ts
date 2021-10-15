import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { postProductType } from "../lib/productType/postProductType";

export const productTypeRouter = (): Router => {
  const productTypeRouter = Router();

  productTypeRouter.use(authMiddleware);

  // Get a specific product type
  productTypeRouter.get("/:id");

  // Get a specific product type (Query params can be an array of ids)
  productTypeRouter.get("/");

  // Add a product type
  productTypeRouter.post("/", postProductType);

  // Update a product type
  productTypeRouter.put("/");

  // Delete a product type
  productTypeRouter.delete("/:id");

  return productTypeRouter;
};
