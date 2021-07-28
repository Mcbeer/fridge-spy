import { Router } from "express";
import { addNewBrand } from "../lib/brand/addNewBrand";

export const brandRouter = (): Router => {
  const brandRouter = Router();

  // Get a specific brand
  brandRouter.get("/:id");

  // Get aall brand
  brandRouter.get("/");

  // Add a brand
  brandRouter.post("/", addNewBrand);

  // Update a brand
  brandRouter.put("/");

  // Delete a brand
  brandRouter.delete("/:id");

  return brandRouter;
};
