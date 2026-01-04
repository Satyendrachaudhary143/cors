import express from "express";
import { register, login, dummyData } from "./controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

/* 🔥 dummy api */
router.get("/dummy", dummyData);

export default router;
