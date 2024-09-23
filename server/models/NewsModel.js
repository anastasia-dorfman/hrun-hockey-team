import mongoose from "mongoose";
import Counter from "./counter.js";

const NewsSchema = new mongoose.Schema(
  {
    newsId: {
      type: Number,
      unique: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      minlength: 5,
      maxlength: 150,
    },
    abstract: {
      type: String,
      index: true,
      minlength: 5,
      maxlength: 350,
    },
    content: {
      type: String,
      required: true,
      index: true,
      minlength: 20,
    },
    images: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one image is required"],
    },
  },
  { timestamps: true }
);

NewsSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "newsId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.newsId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

NewsSchema.index({ title: "text", content: "text", abstract: "text" });

export default mongoose.model("News", NewsSchema);
