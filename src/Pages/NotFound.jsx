import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-6">
      <h1 className="text-[100px] font-extrabold text-[#2563EB] leading-none">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.  
        Please check the URL or go back to the homepage.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1E3A8A] transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
