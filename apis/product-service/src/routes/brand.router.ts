import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { addBrand } from "../lib/brand/addBrand";
import { getBrandById } from "../lib/brand/getBrandById";
import { getBrands } from "../lib/brand/getBrands";
import { putBrand } from "../lib/brand/putBrand";
import { removeBrand } from "../lib/brand/removeBrand";

const router = Router();

router.use(authMiddleware);

// Get a specific brand
router.get("/:id", getBrandById);

// Get all brand
router.get("/", getBrands);

// Add a brand
router.post("/", addBrand);

// Update a brand
router.put("/", putBrand);

// Delete a brand
router.delete("/:id", removeBrand);

export { router as brandRouter };
