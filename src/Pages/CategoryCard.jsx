import React from "react";

const categories = [
  {
    icon: "⚡",
    title: "Electricity",
    color: "from-amber-400 to-yellow-500",
    border: "border-amber-300",
    desc: "Manage and pay your monthly electricity bills with ease.",
  },
  {
    icon: "🔥",
    title: "Gas",
    color: "from-orange-500 to-red-400",
    border: "border-orange-300",
    desc: "Keep track of your gas usage and make timely payments.",
  },
  {
    icon: "💧",
    title: "Water",
    color: "from-sky-400 to-blue-500",
    border: "border-sky-300",
    desc: "Monitor your water consumption and pay bills easily.",
  },
  {
    icon: "🌐",
    title: "Internet",
    color: "from-emerald-400 to-teal-500",
    border: "border-emerald-300",
    desc: "Stay connected and manage your internet service bills online.",
  },
];

const CategoryCard = () => {
  return (
    <section className="relative py-10">
      {/* subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-sky-100/70 dark:border-slate-700 text-xs sm:text-sm text-sky-700 dark:text-sky-300 shadow-sm">
            SmartUtility · Categories
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Explore our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
              utility categories
            </span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Organize all your recurring bills into clear, easy-to-manage
            categories and stay in full control of your monthly expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className={`group relative rounded-2xl bg-white/70 dark:bg-slate-900/70 border ${item.border} border-opacity-60 dark:border-opacity-60 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1`}
            >
              {/* gradient glow */}
              <div
                className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-70 blur-xl -z-10 transition-opacity`}
              />

              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 shadow-inner border border-white/60 dark:border-slate-700 text-3xl">
                  <span className="drop-shadow-sm">{item.icon}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-4 text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Manage {item.title}
                  <span className="text-base">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
