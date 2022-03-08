import { Router } from "express";
import { addLocationProduct } from "../lib/locationProduct/addLocationProduct";
import { getLocationProductsByLocationId } from "../lib/locationProduct/getLocationProductsByLocationId";

const router = Router();

// Get all locations for the user
router.get("/:locationId", getLocationProductsByLocationId);

router.post("/", addLocationProduct);

// Delete a location
// router.delete("/:id", removeLocation);

export { router as locationProductRouter };
