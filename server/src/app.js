import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { _env } from "./constants.js";

const app = express();

const origin = _env.ORIGIN.split(",");

app.use(
  cors({
    origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50kb" }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Home route hit",
  });
});

import google from "./routes/auth.route.js";

app.use("/api/v1/google", google);

export default app;
