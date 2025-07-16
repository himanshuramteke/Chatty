import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessagesController,
  getUsersForSidebarController,
  sendMessagesController,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebarController);
router.get("/:id", protectRoute, getMessagesController);

router.post("/send/:id", protectRoute, sendMessagesController);

export default router;
