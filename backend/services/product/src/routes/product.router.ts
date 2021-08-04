import { Router } from "express";
import { getProducts } from "../lib/product/getProducts";

export const productRouter = (): Router => {
  const productRouter = Router();

  // Get a specific product
  productRouter.get("/:id");

  // Get products (Query params will define an array of ids)
  productRouter.get("/", getProducts);

  // Add a new product
  productRouter.post("/");

  // Update a product
  productRouter.put("/");

  // Delete a product
  productRouter.delete("/:id");

  return productRouter;
};
