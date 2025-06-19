import { Router } from "express";
import {
  Create,
  Delete,
  getAllBooks,
  getBookById,
  Update,
} from "../controller/Books.js";
import authMid from "../middleware/AuthUser..js";
import { verifyAdmin } from "../middleware/AdminAuth.js";
import { addReview, deleteReview } from "../controller/reviews.js";

const router = Router();

router.post("/create", verifyAdmin, Create);
router.put("/update/:id", verifyAdmin, Update);
router.delete("/delete/:id", verifyAdmin, Delete);
router.get("/allbooks", getAllBooks);
router.get("/:id", getBookById);
router.post("/:bookId/review", authMid, addReview);
router.delete("/:bookId/review/:reviewId", authMid, deleteReview);
router.get("/currentuser", authMid, (req, res) => {
  res.json({ userId: req.user.id, username: req.user.username });
});

export default router;
