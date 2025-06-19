import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
  });
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/book/allbooks");
      const data = await res.json();
      setBooks(data.books || []);
    } catch (error) {
      toast.error("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/book/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast.success("Book deleted");
      fetchBooks();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (id) => {
    navigate(`/addbook/${id}`);
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="flex justify-end mb-4">
        <Link to="/addbook">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            ➕ Add New Book
          </button>
        </Link>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(books) &&
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded shadow overflow-hidden"
            >
              <img
                src={book.coverImage || "https://via.placeholder.com/300x400"}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{book.title}</h4>
                <p className="text-sm text-gray-600">by {book.author}</p>

                {book.genre && (
                  <p className="text-sm text-purple-600 mt-1">
                    Genre: {book.genre}
                  </p>
                )}

                <p className="my-2 text-sm text-gray-700 line-clamp-3">
                  {book.description || "No description available."}
                </p>

                {typeof book.averageRating === "number" && (
                  <p className="text-yellow-500 text-sm mb-2">
                    ★ {book.averageRating.toFixed(1)}
                  </p>
                )}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
