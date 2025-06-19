import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");

  const storedUser = localStorage.getItem("user");
  const username = storedUser ? JSON.parse(storedUser).username : null;
  const initials = username ? username.charAt(0).toUpperCase() : "U";
  const isLoggedIn = !!localStorage.getItem("token");

  const excludeSearchBarPaths = [
    "/addbook",
    "/dashboard",
    "/updatepro",
    "/addbook/:id",
    "/bookdetail/:id",
    "/login",
    "/signup",
    "/profile",
    "/adminlogin",
  ];
  const lightPages = ["/login", "/signup"];
  const isLightPage = lightPages.includes(location.pathname);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
    if (location.pathname !== "/books") {
      navigate("/");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/10 backdrop-blur-lg transition-colors duration-300 md:px-10 lg:px-10">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <span className="ml-2 text-2xl font-bold text-white">
            ChapterNest
          </span>
        </a>

        {!excludeSearchBarPaths.includes(location.pathname) && (
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Search books..."
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}

        {/* Desktop Links + Profile */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <Link
            to="/"
            className="text-sm font-medium hover:text-purple-400 transition"
          >
            Home
          </Link>

          {!isLoggedIn ? (
            <>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
          ) : (
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          )}

          {isLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <Link to="/profile">
                <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-full font-semibold">
                  <span className="text-sm hidden sm:inline">
                    Hi, {username}
                  </span>
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white font-bold">
                    {initials}
                  </div>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="md:hidden">
          <button className="text-white" onClick={() => setIsMenuOpen(true)}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-In Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 bg-gray-800">
          {!excludeSearchBarPaths.includes(location.pathname) && (
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="Search books..."
              className="w-full px-3 py-2 rounded-md bg-white/90 text-black focus:outline-none"
            />
          )}

          <Link
            to="/"
            className="block text-sm hover:text-purple-400 bg-gray-800"
          >
            Home
          </Link>
          <a
            href="#contact"
            className="block text-sm hover:text-purple-400 bg-gray-800"
          >
            Contact
          </a>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block text-sm hover:text-purple-400 bg-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-sm hover:text-purple-400 bg-gray-800"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="space-y-2 bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
                  {initials}
                </div>
                <span className="text-sm">Hi, {username}</span>
              </div>

              <Link
                to="/profile"
                className="block text-sm hover:text-purple-400"
              >
                View Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                  toast.success("Logout success");
                }}
                className="block w-full text-left text-sm text-red-500 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
