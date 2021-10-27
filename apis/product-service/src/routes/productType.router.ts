import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { getProductTypes } from "../lib/productType/getProductTypes";
import { postProductType } from "../lib/productType/postProductType";

const router = Router();

router.use(authMiddleware);

// Get a specific product type
router.get("/:id");

// Get all product types
router.get("/", getProductTypes);

// Add a product type
router.post("/", postProductType);

// Update a product type
router.put("/");

// Delete a product type
router.delete("/:id");

export { router as productTypeRouter };
