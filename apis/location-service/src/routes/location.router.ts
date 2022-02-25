import { Router } from "express";
import { addLocation } from "../lib/location/addLocation";
import { getLocations } from "../lib/location/getLocations";
import { putLocation } from "../lib/location/putLocation";

const router = Router();

// Get all locations for the user
router.get("/", getLocations);

// Add a location
router.post("/", addLocation);

// Update a location
router.put("/", putLocation);

// Delete a location
// router.delete("/:id", removeLocation);

export { router as locationRouter };
