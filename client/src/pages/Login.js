import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const api = "http://localhost:5000/api/login";
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Input Validation (Optional but Recommended)
    if (!username || !password) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      // Check for response status
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || `HTTP Error! Status: ${res.status}`
        );
      }

      const data = await res.json();

      // Handle login response
      if (data.success) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.user) {
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        toast.success(`Welcome ${data.user?.username || username}`);
        navigate("/");
      } else {
        // If login failed due to backend validation
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Catch all other errors
      console.error("Login Error:", error);
      setError("User Does Not Exist" || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                ChapterNest
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                A gripping tale of a hero battling his past, uncovering secrets,
                and risking everything in search of the truth
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <a href="/">
                  <svg
                    className="w-auto h-14 sm:h-16"
                    viewBox="0 0 300 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="logoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#6366F1" />{" "}
                        {/* Indigo-500 */}
                        <stop offset="100%" stopColor="#3B82F6" />{" "}
                        {/* Blue-500 */}
                      </linearGradient>
                    </defs>

                    {/* Circle Icon */}
                    <circle cx="50" cy="50" r="40" fill="url(#logoGradient)" />

                    {/* Shopping Bag Icon inside circle */}
                    <path
                      d="M43 35 h14 a2 2 0 0 1 2 2 v26 a2 2 0 0 1 -2 2 h-14 a2 2 0 0 1 -2 -2 v-26 a2 2 0 0 1 2 -2 z"
                      fill="white"
                    />
                    <path
                      d="M48 38 v5 a7 7 0 0 0 14 0 v-5"
                      stroke="url(#logoGradient)"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Brand Name */}
                    <text
                      x="110"
                      y="60"
                      textAnchor="start"
                      fontSize="32"
                      fontWeight="700"
                      fontFamily="'Segoe UI', Arial, sans-serif"
                      fill="url(#logoGradient)"
                    >
                      ChapterNest
                    </text>
                  </svg>
                </a>
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="sameer"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {Error && (
                  <div className="mt-4 text-red-500 text-sm text-center">
                    {Error}
                  </div>
                )}
                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                    )}
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
              <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-32">
                <div className="rounded-md shadow">
                  <a
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white bg-pink-400 hover:bg-pink-500 hover:text-white focus:ring ring-offset-2 ring-pink-400 focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Signup
                  </a>
                </div>
                <div className="rounded-md shadow">
                  <a
                    href="/adminlogin"
                    target="_blank"
                    rel="noopener"
                    className="w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-purple-700 dark:text-purple-700 bg-purple-100 hover:bg-purple-50 hover:text-purple-600 focus:ring ring-offset-2 ring-purple-100 focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
