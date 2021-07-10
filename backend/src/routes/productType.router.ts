import { Router } from "express";

export const productTypeRouter = (): Router => {
  const productTypeRouter = Router();

  // Get a specific product type
  productTypeRouter.get("/:id");

  // Add a product type
  productTypeRouter.post("/");

  // Update a product type
  productTypeRouter.put("/");

  // Delete a product type
  productTypeRouter.delete("/:id");

  return productTypeRouter;
};
