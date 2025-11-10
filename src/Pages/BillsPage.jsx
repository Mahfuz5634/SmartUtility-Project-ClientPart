import React, { useEffect, useState } from "react";

const BillsPage = () => {
  const [bills, setBills] = useState([]); // you'll fill this from MongoDB later

   useEffect(() => {
      fetch("http://localhost:3000/allbill") 
        .then((res) => res.json())
        .then((data) => setBills(data))
        .catch((err) => console.error("Error fetching bills:", err));
    }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        All Bills
      </h2>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-white  rounded-xl shadow-xl hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* Image */}
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full h-48 object-contain"
            />

            {/* Content */}
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

              {/* Button */}
              <button className="w-full bg-[#0077b6] text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsPage;
