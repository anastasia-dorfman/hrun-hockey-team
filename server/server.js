import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

//routers
import productRouter from "./routes/productRouter.js";
import newsRouter from "./routes/newsRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//email Module
import { sendEmail } from "./modules/emailModule.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://castors-tau.vercel.app",
      "https://castors.netlify.app",
      "https://stirring-peony-431279.netlify.app",
    ], // Allow both local and production origins
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/products", productRouter);
app.use("/api/news", newsRouter);
app.use("/api/user", authenticateUser, userRouter);
app.use("/api/auth", authRouter);
// contact form route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await sendEmail(
      process.env.TEAM_EMAIL,
      "New Contact Form Submission",
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      `<h1>New Contact Form Submission</h1>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong> ${message}</p>`
    );

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5101;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
