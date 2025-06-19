import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setUserData(res.data.user);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!userData)
    return <div className="p-6 text-center">Loading profile...</div>;

  const initials = userData.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Profile Card */}
      <div className="rounded-2xl bg-white p-10 text-gray-900 shadow-xl mb-10">
        <div className="flex flex-col md:flex-row">
          {/* Avatar */}
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-800 text-white text-5xl font-bold border-4 border-indigo-800 ring ring-gray-300 hover:scale-105 transition-transform">
              {initials}
            </div>
            <Link
              to="/updatepro"
              className="mt-4 inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-all"
            >
              Edit Profile
            </Link>
          </div>

          {/* Details */}
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-2xl font-bold text-indigo-800 mb-2">
              {userData.username}
            </h1>
            <p className="text-gray-600 mb-4 capitalize">
              Role: {userData.role}
            </p>

            <h2 className="text-xl font-semibold text-indigo-800 mb-2">
              Account Created
            </h2>
            <p className="text-gray-700 mb-4">
              {moment(userData.createdAt).format("MMMM Do YYYY, h:mm A")}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">
          Your Reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">You have not posted any reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-l-4 border-purple-600 pl-4 bg-gray-50 rounded-md p-4"
              >
                <h3 className="text-lg font-semibold text-purple-800">
                  {review.bookTitle}
                </h3>
                <p className="text-yellow-600 font-medium">
                  Rating: {review.rating} / 5
                </p>
                <p className="text-gray-800 mt-1 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted on:{" "}
                  {moment(review.createdAt).format("MMM D, YYYY • h:mm A")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
