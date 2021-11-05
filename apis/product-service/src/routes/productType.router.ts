import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { getProductTypes } from "../lib/productType/getProductTypes";
import { postProductType } from "../lib/productType/postProductType";
import { removeProductType } from "../lib/productType/removeProductType";
import { updateProductType } from "../lib/productType/updateProductType";

const router = Router();

router.use(authMiddleware);

// Will be implemented if needed
// // Get a specific product type
// router.get("/:id");

// Get all product types
router.get("/", getProductTypes);

// Add a product type
router.post("/", postProductType);

// Update a product type
router.put("/", updateProductType);

// Delete a product type
router.delete("/:id", removeProductType);

export { router as productTypeRouter };
