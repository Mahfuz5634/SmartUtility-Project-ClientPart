import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";

const BillsCardSection = () => {
  const { loading } = useContext(AuthContext);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("https://smart-utility-server.vercel.app/recentbill")
      .then((res) => res.json())
      .then((data) => setBills(data.slice(0, 6)))
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  return loading ? (
    <div className="container mx-auto flex justify-center items-center">
      <span className="loading loading-spinner text-info"></span>
    </div>
  ) : (
    <div className="px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#101828] dark:text-white">
        Recent Bills
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bills.map((bill, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-[#101828] mb-2">
              {bill.title}
            </h3>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Category: <span className="text-blue-600">{bill.category}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Location: {bill.location}
            </p>
            <p className="text-sm text-gray-500 mb-4">Date: {bill.date}</p>

            <Link
              to={`/billdetails/${bill._id}`}
              className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90  text-white text-sm font-semibold py-2 px-4 rounded-lg"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsCardSection;
