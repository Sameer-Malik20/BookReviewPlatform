import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const navigate = useNavigate();
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/book/allbooks");
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Failed to fetch books:", err.message);
      }
    };
    fetchBooks();
  }, []);

  // Get unique genres
  const genres = [
    "All",
    ...new Set(books.map((book) => book.genre).filter(Boolean)),
  ];

  // Apply filters
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === "All" || book.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <Hero />
      <h1 className="text-3xl font-bold text-center mb-8 mt-20">
        Trending Books
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-center">
        Discover the most popular books our community is reading and reviewing
        right now
      </p>

      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-3 my-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setGenreFilter(genre)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              genreFilter === genre
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="w-full max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={book.coverImage || "https://via.placeholder.com/300x400"}
                  alt={book.title}
                />
                {book.genre && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    {book.genre}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= book.averageRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {book.averageRating ? book.averageRating.toFixed(1) : "N/A"}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {book.description || "No description available."}
                </p>

                <div className="mt-4">
                  <button
                    className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    onClick={() => navigate(`/bookdetail/${book._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-8">
            No books found.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Books;
