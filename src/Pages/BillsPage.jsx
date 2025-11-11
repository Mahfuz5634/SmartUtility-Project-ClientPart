import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");


  const categories = ["All", "Electricity", "Gas", "Water", "Internet"];

  const fetchBills = async (category = "All") => {
    let url = "http://localhost:3000/allbilltwo";
    if (category !== "All") {
      url += `?category=${category}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchBills(category);
  };

  return (

    <div className="max-w-6xl mx-auto px-4 py-10">
      <title>SmartUtility-Bills</title>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        All Bills
      </h2>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={handleFilterChange}
          className="select select-bordered w-full max-w-xs"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full h-48 object-contain bg-gray-50"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {bill.title}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {bill.category}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span> {bill.location}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Amount:</span> ৳{bill.amount}
              </p>

              <Link to={`/billdetails/${bill._id}`}>
                <button className="w-full bg-[#0077b6] text-white py-2 rounded-lg font-medium hover:bg-[#0076b6ce] transition">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {bills.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No bills found!</p>
      )}
    </div>
  );
};

export default BillsPage;
