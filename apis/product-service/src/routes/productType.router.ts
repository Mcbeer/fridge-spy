import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { postProductType } from "../lib/productType/postProductType";

const router = Router();

router.use(authMiddleware);

// Get a specific product type
router.get("/:id");

// Get a specific product type (Query params can be an array of ids)
router.get("/");

// Add a product type
router.post("/", postProductType);

// Update a product type
router.put("/");

// Delete a product type
router.delete("/:id");

export { router as productTypeRouter };
