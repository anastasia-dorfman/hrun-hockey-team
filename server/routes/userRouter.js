import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  updateUser,
  // deleteUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getCurrentUser)
  .patch(authenticateUser, validateUpdateUserInput, updateUser);
// .delete(deleteUser);

export default router;
