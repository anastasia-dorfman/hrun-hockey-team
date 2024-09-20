import { Router } from "express";
import {
  register,
  login,
  logout,
  restoreAccount,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
  validateRestoreAccountInput,
} from "../middleware/validationMiddleware.js";
import User from "../models/UserModel.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);
router.patch("/restore-account", validateRestoreAccountInput, restoreAccount);

export default router;
