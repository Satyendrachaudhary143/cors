import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();
const app = express();

/* 🔥 CORS CONFIG */
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
