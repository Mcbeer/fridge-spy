import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { getProductById } from "../lib/product/getProductById";
import { getProducts } from "../lib/product/getProducts";
import { postProduct } from "../lib/product/postProduct";
import { removeProduct } from "../lib/product/removeProduct";
import { updateProduct } from "../lib/product/updateProduct";

const router = Router();

router.use(authMiddleware);

// Get a specific product
router.get("/:id", getProductById);

// Get products (Query params will define an array of ids)
router.get("/", getProducts);

// Add a new product
router.post("/", postProduct);

// Update a product
router.put("/", updateProduct);

// Delete a product
router.delete("/:id", removeProduct);

export { router as productRouter };
