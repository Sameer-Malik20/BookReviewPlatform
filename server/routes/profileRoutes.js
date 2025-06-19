import { Router } from "express";
import authMid from "../middleware/AuthUser..js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controller/userProfile.js";
const router = Router();

router.get("/profile", authMid, getUserProfile);
router.put("/profile/update", authMid, updateUserProfile);

export default router;
