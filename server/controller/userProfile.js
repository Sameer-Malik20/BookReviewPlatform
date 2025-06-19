import User from "../models/user.js";
import Book from "../models/Book.js"; 

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const books = await Book.find({ "reviews.user": req.user.id });

    const reviews = [];

    books.forEach((book) => {
      book.reviews.forEach((r) => {
        if (r.user.toString() === req.user.id.toString()) {
          reviews.push({
            bookTitle: book.title,
            rating: r.rating,
            comment: r.comment,
            createdAt: r.createdAt,
          });
        }
      });
    });

    res.json({ user, reviews });
  } catch (err) {
    console.error("getUserProfile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
