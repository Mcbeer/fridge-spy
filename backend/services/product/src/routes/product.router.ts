import { Router } from "express";

export const productRouter = (): Router => {
  const productRouter = Router();

  // Get a specific product
  productRouter.get("/:id");

  // Get a products (Query params will define an array of ids)
  productRouter.get("/:id");

  // Add a new product
  productRouter.post("/");

  // Update a product
  productRouter.put("/");

  // Delete a product
  productRouter.delete("/:id");

  return productRouter;
};
