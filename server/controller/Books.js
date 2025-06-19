import Book from "../models/Book.js";

const Create = async (req, res) => {
  const { title, author, description, genre, coverImage, publishedDate } =
    req.body;
  try {
    const book = await new Book({
      title,
      author,
      description,
      genre,
      coverImage,
      user: req.user.id,
    });
    await book.save();
    res.status(201).json({
      message: "Book Created SuccessFully",
      success: true,
      user: req.user.id,
      book,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "server error",
      success: false,
      error,
    });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, genre, coverImage, publishedDate } =
    req.body;
  try {
    const bookUpdate = await Book.findByIdAndUpdate(
      id,
      { title, author, description, genre, coverImage, publishedDate },
      { new: true }
    );
    if (!bookUpdate) {
      return res.status(500).json({
        message: "book not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Book Updated Successfully",
      success: true,
      bookUpdate,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const bookDel = await Book.findByIdAndDelete(id);
    if (!bookDel) {
      return res.status(500).json({
        message: "Book not Found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Book Deleted SuccessFully",
      success: false,
      bookDel,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books || books.length == 0) {
      return res.status(500).json({
        message: "Books Not Found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Books Fecthed Successfully",
      success: true,
      books,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export { Create, Update, Delete, getAllBooks, getBookById };
