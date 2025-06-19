import Book from "../models/Book.js";
import User from "../models/user.js";

const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { comment, rating } = req.body;
    const currUser = req.user;
    console.log("currUser", currUser);

    if (!currUser || !currUser.username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.reviews.push({
      comment,
      rating,
      user: currUser.id,
      username: currUser.username,
      createdAt: new Date(),
    });

    const totalRating = book.reviews.reduce((sum, r) => sum + r.rating, 0);
    book.averageRating = totalRating / book.reviews.length;

    await book.save();
    res.status(200).json({ message: "Review added", reviews: book.reviews });
  } catch (err) {
    console.error("Add review error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = book.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    book.reviews = book.reviews.filter(
      (r) => r._id.toString() !== reviewId.toString()
    );

    const totalRating = book.reviews.reduce((sum, r) => sum + r.rating, 0);
    book.averageRating =
      book.reviews.length > 0 ? totalRating / book.reviews.length : 0;

    await book.save();

    res.status(200).json({ message: "Review deleted", reviews: book.reviews });
  } catch (err) {
    console.error("Delete review error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { addReview, deleteReview };
