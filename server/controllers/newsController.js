import News from "../models/NewsModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllnews = async (req, res) => {
  const news = await News.find({});
  res.status(StatusCodes.OK).json({ news });
};

export const getLatestnews = async (req, res) => {
  const news = await News.find({}).sort({ date: -1 }).limit(3);
  res.status(StatusCodes.OK).json({ news });
};

export const createNews = async (req, res) => {
  const singleNews = await News.create(req.body);
  res.status(StatusCodes.OK).json({ singleNews });
};

export const getNews = async (req, res) => {
  const singleNews = await News.findOne({ newsId: req.params.newsId });
  res.status(StatusCodes.OK).json({ singleNews });
};

export const updateNews = async (req, res) => {
  const updatedNews = await News.findOneAndUpdate(
    { newsId: req.params.newsId },
    req.body,
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "News modified", singleNews: updatedNews });
};

export const deleteNews = async (req, res) => {
  const removedNews = await News.findOneAndDelete({
    newsId: req.params.newsId,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "News deleted", singleNews: removedNews });
};
