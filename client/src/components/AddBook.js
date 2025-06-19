import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // If ID is present, it's edit mode

  // Load book data in edit mode
  useEffect(() => {
    if (id) {
      console.log("Fetching book with ID:", id);
      axios
        .get(`http://localhost:5000/api/book/${id}`)
        .then((res) => {
          console.log("Response from backend:", res.data);
          const data = res.data.book || res.data;
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
          setGenre(data.genre || "");
          setCoverImage(data.coverImage || "");
          setPublishedDate(data.publishedDate || "");
        })
        .catch((err) => {
          console.error("Edit fetch error:", err); // 👈 Show actual error
          toast.error("Failed to load book for editing.");
        });
    }
  }, [id]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookData = {
      title,
      author,
      description,
      genre,
      coverImage,
      publishedDate,
    };

    try {
      const res = id
        ? await axios.put(
            `http://localhost:5000/api/book/update/${id}`,
            bookData,
            {
              withCredentials: true,
            }
          )
        : await axios.post("http://localhost:5000/api/book/create", bookData, {
            withCredentials: true,
          });

      if (res.data.success) {
        toast.success(
          id ? "Book updated successfully!" : "Book added successfully!"
        );
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border-4 rounded-lg shadow relative m-10 max-w-5xl mx-auto">
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">
          {id ? "Edit Book" : "Add New Book"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-3 rounded border border-gray-300"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Author
              </label>
              <input
                type="text"
                className="w-full p-3 rounded border border-gray-300"
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Genre
              </label>
              <input
                type="text"
                className="w-full p-3 rounded border border-gray-300"
                placeholder="e.g. Fiction, Romance"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Published Date
              </label>
              <input
                type="date"
                className="w-full p-3 rounded border border-gray-300"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Cover Image
              </label>
              <input
                type="file"
                ref={fileInputRef}
                className="w-full p-2 rounded border border-gray-300"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setCoverImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Preview"
                  className="mt-3 h-32 object-cover border rounded"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full p-3 rounded border border-gray-300"
                placeholder="About the book"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 rounded-b">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Saving..." : id ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
