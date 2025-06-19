import Books from "./pages/AllBooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookDetail from "./components/BookDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./components/userProfile";
import UpdateProfile from "./components/updateProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/Dashboard";
import AddBook from "./components/AddBook";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/bookdetail/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/updatepro" element={<UpdateProfile />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/addbook/:id" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
