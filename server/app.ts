require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import cors from "cors";
import Nylas from "nylas";

export const app = express();

export const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", userRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
