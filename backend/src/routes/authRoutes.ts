import express from "express";
import {
  userValidator,
  validateEmailExistence,
} from "../validators/userValidator";
import * as authController from "../controllers/authController";
import {
  authenticateUser,
  validateCredential,
} from "../validators/authValidator";

const router = express.Router();

router.post(
  "/signup",
  userValidator,
  validateEmailExistence,
  authController.signUp
);

router.post("/signout", authenticateUser, authController.signOut);
router.post("/refresh", authController.refresh);
router.post("/signin", validateCredential, authController.signIn);

export default router;
