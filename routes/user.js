import express from "express";
import { getMyProfile, register, login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares.js/auth.js";
const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
