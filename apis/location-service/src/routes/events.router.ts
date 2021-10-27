import { authMiddleware } from "@fridgespy/express-helpers";
import { Router } from "express";
import { setupSSE } from "../events/setupSSE";

const router = Router();

router.use(authMiddleware);

// Get a specific brand
router.get("/", setupSSE);

export { router as eventsRouter };
