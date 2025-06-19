# 📚 Book Review Platform

A full-featured Book Review Platform where users can discover books, view detailed information, write reviews, and add books to their cart or wishlist.

This project is built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) and aims to provide a seamless user experience similar to platforms like Goodreads and Internshala's UI for profile management.

---

## 🔥 Features

- 🏠 **Homepage** – Browse or search for books
- 📖 **Book Details Page** – View book info, thumbnails, reviews, and post your own review
- ✍️ **Review System** – Add, delete, and display user reviews with ratings
- 🛒 **Cart Functionality** – Add books to the cart (requires login)
- 💜 **Wishlist** – Save books to wishlist (non-functional placeholder in this version)
- 🔐 **User Authentication** – Required for posting reviews and adding to cart
- 👤 **Profile Dropdown** – Shows profile actions (View, Update, Logout) like Internshala's hover/click menu
- 📱 **Responsive Design** – Mobile-first and fully responsive layout

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- TailwindCSS
- React Router DOM
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cookie-based Authentication

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform

cd client
npm install
npm start

cd server
npm install
npm run dev

| Method | Endpoint                             | Description                  |
| ------ | ------------------------------------ | ---------------------------- |
| GET    | `/api/allbooks`                      | Get all books                |
| GET    | `/api/currentuser`                   | Get currently logged-in user |
| POST   | `/api/cart/add`                      | Add book to cart             |
| POST   | `/api/book/:id/review`               | Post a review on book        |
| DELETE | `/api/book/:bookId/review/:reviewId` | Delete a review              |

🙋‍♂️ Author
👤 Sameer Malik
LinkedIn: https://www.linkedin.com/in/sameer-malik-67ab45217
Email: sameermalik63901@gmail.com

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a PR.

📄 License
This project is licensed under the MIT License.

⭐ Acknowledgements
Internshala UI concept inspiration

TailwindCSS for styling

React Toastify for elegant alerts

Open Source Book API (or local seed data)

🧠 Future Improvements
Search by author/category

Wishlist backend functionality

Admin dashboard to manage books

JWT-based authentication

yaml
Copy
Edit
