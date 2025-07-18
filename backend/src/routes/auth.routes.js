import express from "express";
import {
  checkAuthController,
  loginController,
  logoutController,
  signupController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfileController
);

router.get("/check", protectRoute, checkAuthController);

export default router;
