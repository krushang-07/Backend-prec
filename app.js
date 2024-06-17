import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares.js/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], //website url for the request
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //for the send cookies to frontend
  })
);

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

//using error middleware
app.use(errorMiddleware);
