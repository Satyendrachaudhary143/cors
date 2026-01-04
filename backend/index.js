import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();

/* 🔥 FINAL CORS CONFIG */
app.use(
    cors({
      origin: "https://cors-bay-nine.vercel.app", // ✅ frontend URL
      credentials: true,                          // ✅ cookies allow
      methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const PORT = 5000;
app.listen(PORT, () => console.log("Server running"));
