import { Router } from "express";

export const productRouter = (): Router => {
  const productRouter = Router();

  // Get all products for the location
  productRouter.get("/:locationId");

  // Get a specific product
  productRouter.get("/:id");

  // Add a product
  productRouter.post("/");

  // Update a product
  productRouter.put("/");

  // Delete a product
  productRouter.delete("/:id");

  return productRouter;
};
