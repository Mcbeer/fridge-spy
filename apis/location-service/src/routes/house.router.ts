import { Router } from "express";
import { addHouse } from "../lib/house/addHouse";
import { getHouse } from "../lib/house/getHouse";
import { getHouses } from "../lib/house/getHouses";
import { removeHouse } from "../lib/house/removeHouse";
import { updateHouse } from "../lib/house/updateHouse";

const router = Router();

// Get a specific house
router.get("/:id", getHouse);

// Get all houses
router.get("/", getHouses);

// Add a house
router.post("/", addHouse);

// Update a house
router.put("/", updateHouse);

// Delete a house
router.delete("/:id", removeHouse);

export { router as houseRouter };
