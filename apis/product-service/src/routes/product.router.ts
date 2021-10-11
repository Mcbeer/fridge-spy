import { Router } from "express";
import { getProductById } from "../lib/product/getProductById";
import { getProducts } from "../lib/product/getProducts";
import { postProduct } from "../lib/product/postProduct";

export const productRouter = (): Router => {
  const productRouter = Router();

  // Get a specific product
  productRouter.get("/:id", getProductById);

  // Get products (Query params will define an array of ids)
  productRouter.get("/", getProducts);

  // Add a new product
  productRouter.post("/", postProduct);

  // Update a product
  productRouter.put("/");

  // Delete a product
  productRouter.delete("/:id");

  return productRouter;
};
