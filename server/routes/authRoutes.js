import { Router } from "express";
import { Login, logout, Signup } from "../controller/auth.js";
const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", logout);

export default router;
