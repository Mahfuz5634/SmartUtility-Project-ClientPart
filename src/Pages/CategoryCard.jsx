import React from "react";

const CategoryCard = () => {
  return (
    <div>
      {/* Category Cards */}
      <div className="max-w-7xl mx-auto mt-5 pb-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-white">
          Explore Our Utility Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Electricity */}
          <div className="bg-white p-6 rounded-xl shadow hover:scale-103 transition text-center border-t-4 border-yellow-400">
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Electricity
            </h3>
            <p className="text-gray-600 text-sm">
              Manage and pay your monthly electricity bills with ease.
            </p>
          </div>

          {/* Gas */}
          <div className="bg-white p-6 rounded-xl shadow hover:scale-103 transition text-center border-t-4 border-orange-500">
            <div className="text-5xl mb-3">🔥</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Gas</h3>
            <p className="text-gray-600 text-sm">
              Keep track of your gas usage and make timely payments.
            </p>
          </div>

          {/* Water */}
          <div className="bg-white p-6 rounded-xl shadow hover:scale-103 transition text-center border-t-4 border-blue-500">
            <div className="text-5xl mb-3">💧</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Water</h3>
            <p className="text-gray-600 text-sm">
              Monitor your water consumption and pay bills easily.
            </p>
          </div>

          {/* Internet */}
          <div className="bg-white p-6 rounded-xl shadow hover:scale-103 transition text-center border-t-4 border-green-500">
            <div className="text-5xl mb-3">🌐</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Internet
            </h3>
            <p className="text-gray-600 text-sm">
              Stay connected and manage your internet service bills online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
