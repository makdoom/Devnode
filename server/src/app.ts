import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PAYLOAD_LIMIT } from "./constant";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

// Initialize express app
const app = express();

// Middlewares
app.use(express.json({ limit: PAYLOAD_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: PAYLOAD_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Routes
import userRouter from "./routes/user.routes";
import blogRouter from "./routes/blog.routes";

// Routes declaration

// User Routes
app.use("/api/v1/user", userRouter);
// Blog Routes
app.use("/api/v1/blog", blogRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
