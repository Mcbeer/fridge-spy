import { Router } from "express";

export const brandRouter = (): Router => {
  const brandRouter = Router();

  // Get a specific product
  brandRouter.get("/:id");

  // Add a product
  brandRouter.post("/");

  // Update a product
  brandRouter.put("/");

  // Delete a product
  brandRouter.delete("/:id");

  return brandRouter;
};
