import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

// Get a specific house
router.get("/:id");

// Get all houses
router.get("/");

// Add a house
router.post("/");

// Update a house
router.put("/");

// Delete a house
router.delete("/:id");

export { router as houseRouter };
