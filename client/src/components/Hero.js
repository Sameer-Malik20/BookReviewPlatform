import React, { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchContext } from "../context/SearchContext";
import Navbar from "./Navbar";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const storedUser = localStorage.getItem("user");
  const username = storedUser ? JSON.parse(storedUser).username : null;
  console.log(username);

  const initials = username ? username.charAt(0).toUpperCase() : "U";
  const isLoggedIn = !!localStorage.getItem("token");
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
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      {searchTerm.trim().length === 0 && (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121212] to-purple-800 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
          <div className="relative z-10 w-full max-w-7xl px-4 text-center text-white">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Catching Life's{" "}
              <span className="relative whitespace-nowrap text-purple-400">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full fill-purple-400/70"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73..." />
                </svg>
                <span className="relative">Beautiful</span>
              </span>{" "}
              Stories
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              From epic adventures to heartfelt memoirs, our handpicked
              collection brings stories to life. Let every book turn a page in
              your journey
            </p>
            <div className="flex justify-center items-center mt-8">
              <a
                href="/"
                className="relative flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                <span className="absolute inset-0 rounded-full bg-purple-600 opacity-50 animate-ping" />
                <span className="relative z-10 pr-2">Explore Books</span>
              </a>
            </div>
          </div>

          {/* Scroll Down Icon */}
          <div className="absolute bottom-10 sm:bottom-14 left-1/2 transform -translate-x-1/2 animate-bounce z-10 justify-center">
            <a href="#about" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Hero;
