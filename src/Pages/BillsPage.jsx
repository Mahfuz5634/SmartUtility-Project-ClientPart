import React, { useContext, useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";

const BillsPage = () => {
  const { loading } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFetching, setIsFetching] = useState(false);

  const categories = ["All", "Electricity", "Gas", "Water", "Internet"];

  const fetchBills = async (category = "All") => {
    setIsFetching(true);
    let url = "https://smart-utility-server.vercel.app/allbilltwo";
    if (category !== "All") {
      url += `?category=${encodeURIComponent(category)}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setIsFetching(false);
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

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-64">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return (
    <Slide
      direction="up"
      duration={800}
      triggerOnce
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <div>
        <title>SmartUtility - Bills</title>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-100/70 dark:border-slate-700 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 shadow-sm">
            📊 Browse all your utility bills
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#023e8a] via-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent tracking-wide">
            All{" "}
            <span className="text-[#03045e] dark:text-[#caf0f8]">
              Bills
            </span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Filter bills by category and quickly open any bill to view full
            details and proceed with payment when available.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label
              htmlFor="category-filter"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Filter by category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleFilterChange}
              className="select select-bordered w-full max-w-xs bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {isFetching && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="loading loading-spinner loading-xs text-info" />
              <span>Refreshing bills…</span>
            </div>
          )}
        </div>

        {/* Bills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bills.map((bill) => (
            <article
              key={bill._id}
              className="group relative rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-100/80 dark:border-slate-700/80 backdrop-blur-md shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* gradient edge on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/10 via-cyan-400/5 to-blue-600/10 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity" />

              {/* Image */}
              <div className="relative bg-gray-50 dark:bg-slate-800">
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="w-full h-44 sm:h-48 object-contain p-3"
                />
                <span className="absolute top-3 left-3 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200 text-xs font-semibold px-3 py-1 shadow-sm">
                  {bill.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 leading-snug line-clamp-2">
                  {bill.title}
                </h3>

                <div className="mt-1 space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Location:
                    </span>
                    <span className="ml-2 text-right">{bill.location}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Amount:
                    </span>
                    <span className="ml-2 text-right text-[#0077b6] font-semibold">
                      ৳{bill.amount}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Tap to view full details</span>
                </div>

                <Link to={`/billdetails/${bill._id}`} className="mt-3">
                  <button className="w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90 text-white py-2.5 rounded-lg font-medium text-sm shadow-sm transition">
                    See Details
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {bills.length === 0 && !isFetching && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm sm:text-base">
            No bills found for the selected category.
          </p>
        )}
      </div>
    </Slide>
  );
};

export default BillsPage;
