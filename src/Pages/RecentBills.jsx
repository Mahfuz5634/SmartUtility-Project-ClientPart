import React, { useEffect, useState } from "react";

const BillsCardSection = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recentbill") 
      .then((res) => res.json())
      .then((data) => setBills(data.slice(0, 6))) 
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  return (
    <div className="px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#101828]">
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

            <button className="bg-[#0077b6] hover:bg-[#0076b6bf] text-white text-sm font-semibold py-2 px-4 rounded-lg">
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsCardSection;
