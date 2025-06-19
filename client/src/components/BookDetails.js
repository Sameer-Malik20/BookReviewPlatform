import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/book/allbooks`).then((res) => {
      const found = res.data.books.find((b) => b._id === id);
      setBook(found);
      setMainImage(found?.image || "");
    });
  }, [id]);

  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading book...</div>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Book Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={book.coverImage || "https://via.placeholder.com/300x400"}
              alt={book.title}
              className="w-full h-96 rounded-lg shadow-md mb-4"
            />
          </div>

          {/* Book Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-1">
              by {book.author || "Unknown Author"}
            </p>

            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 ${
                    star <=
                    Math.round(
                      book.reviews?.reduce((sum, r) => sum + r.rating, 0) /
                        book.reviews?.length || 0
                    )
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782L19.8 24 12 20.016 4.2 24l1.866-9.008L.132 9.21l8.2-1.192z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                {book.reviews?.length || 0} Reviews
              </span>
            </div>

            <p className="text-gray-700 mb-6">{book.description}</p>

            <h3 className="text-lg font-semibold mb-2">Genres:</h3>
            <div className="text-sm text-gray-700">{book.genre || "N/A"}</div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-2xl mx-auto mt-10">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                await axios.post(
                  `http://localhost:5000/api/book/${book._id}/review`,
                  { comment: review, rating, currentUsername, userId },
                  { withCredentials: true }
                );
                setReview("");
                setRating(5);
                const res = await axios.get(
                  `http://localhost:5000/api/book/allbooks`
                );
                const found = res.data.books.find((b) => b._id === book._id);
                setBook(found);
              } catch (err) {
                toast.error(
                  err.response?.data?.message || "Failed to post review."
                );
              }
              setLoading(false);
            }}
            className="flex flex-col gap-2"
          >
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review about this book..."
              className="px-4 py-2 rounded border border-gray-300"
              required
            />
            <div className="flex items-center gap-2">
              <span>Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "text-yellow-400 text-xl"
                      : "text-gray-300 text-xl"
                  }
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Posting..." : "Submit Review"}
            </button>
          </form>

          {/* Show reviews */}
          {book.reviews?.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-bold">Reviews</h3>
              {book.reviews.map((r, i) => (
                <div key={i} className="p-3 rounded bg-purple-50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-purple-700">
                      {r.username || "User"}
                    </span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= r.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                    {userId && r.user === userId && (
                      <button
                        onClick={async () => {
                          await axios.delete(
                            `http://localhost:5000/api/book/api/book/${book._id}/review/${r._id}`,
                            { withCredentials: true }
                          );
                          const res = await axios.get(
                            `http://localhost:5000/api/book/allbooks`
                          );
                          const found = res.data.books.find(
                            (b) => b._id === book._id
                          );
                          setBook(found);
                        }}
                        className="ml-2 text-red-500 text-xs"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800">{r.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
