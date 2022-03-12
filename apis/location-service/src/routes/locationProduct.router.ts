import { Router } from "express";
import { addLocationProduct } from "../lib/locationProduct/addLocationProduct";
import { getLocationProductsByLocationId } from "../lib/locationProduct/getLocationProductsByLocationId";

const router = Router();

// Get all locations for the user
router.get("/:locationId", getLocationProductsByLocationId);

// Adds a new product
router.post("/", addLocationProduct);

export { router as locationProductRouter };
