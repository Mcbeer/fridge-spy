import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

// Get a specific location
router.get("/:id");

// Get all locations
router.get("/");

// Add a location
router.post("/");

// Update a location
router.put("/");

// Delete a location
router.delete("/:id");

export { router as locationRouter };
