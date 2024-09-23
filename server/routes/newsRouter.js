import { Router } from "express";
const router = Router();
import {
  getAllnews,
  getLatestnews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import {
  validateNewsInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import News from "../models/NewsModel.js";

const validateNewsId = validateIdParam("newsId", "news", News);

router.route("/").get(getAllnews).post(validateNewsInput, createNews);
router.route("/recent").get(getLatestnews).post(validateNewsInput, createNews);
router
  .route("/:newsId")
  .get(validateNewsId, getNews)
  .patch(validateNewsId, validateNewsInput, updateNews)
  .delete(validateNewsId, deleteNews);

export default router;
