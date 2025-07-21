import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { askAssistantController } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/ask", protectRoute, askAssistantController);

export default router;
