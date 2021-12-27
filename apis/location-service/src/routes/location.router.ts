import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { addLocation } from "../lib/location/addLocation";
import { getLocations } from "../lib/location/getLocations";

const router = Router();

router.use(authMiddleware);

// Get all locations for the user
router.get("/", getLocations);

// Add a location
router.post("/", addLocation);

// Update a location
router.put("/");

// Delete a location
router.delete("/:id");

export { router as locationRouter };
