import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";

const BillsCardSection = () => {
  const { loading } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://smart-utility-server.vercel.app/recentbill")
      .then((res) => res.json())
      .then((data) => {
        setBills(data.slice(0, 6));
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching bills:", err);
        setError("Unable to load recent bills right now. Please try again.");
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center items-center py-10">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return (
    <section className="relative px-4 py-12 bg-gradient-to-b from-slate-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="flex flex-col items-center text-center mb-8">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-100/70 dark:border-slate-700 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 shadow-sm">
            📄 Latest activity
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#101828] dark:text-white tracking-tight">
            Recent bills overview
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl">
            Quickly review your most recent utility bills and open any bill to
            see full payment details and history.
          </p>
        </div>

        {/* error / empty state */}
        {error && (
          <div className="max-w-md mx-auto mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200 px-4 py-3 text-sm text-center">
            {error}
          </div>
        )}

        {bills.length === 0 && !error ? (
          <div className="max-w-md mx-auto rounded-xl bg-white/80 dark:bg-slate-900/80 border border-dashed border-slate-200 dark:border-slate-700 px-6 py-10 text-center shadow-sm">
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              No recent bills found.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Once new bills are added, they will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bills.map((bill) => (
              <article
                key={bill._id}
                className="group relative rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-100/80 dark:border-slate-700/80 backdrop-blur-md shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* gradient edge */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/10 via-cyan-400/5 to-blue-600/10 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity" />

                <div className="p-5 flex flex-col h-full">
                  {/* header row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-[#101828] dark:text-white leading-snug">
                      {bill.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200 px-2.5 py-0.5 text-xs font-medium">
                      {bill.category}
                    </span>
                  </div>

                  {/* meta info */}
                  <div className="space-y-1.5 text-xs sm:text-sm mb-4">
                    <p className="text-gray-600 dark:text-gray-300 flex justify-between">
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        Location:
                      </span>
                      <span className="ml-2 text-right">{bill.location}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex justify-between">
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        Date:
                      </span>
                      <span className="ml-2 text-right">{bill.date}</span>
                    </p>
                  </div>

                  {/* footer */}
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Tap to view full details
                    </span>
                    <Link
                      to={`/billdetails/${bill._id}`}
                      className="inline-flex items-center gap-1 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:brightness-110 text-white text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-lg shadow-sm transition-all"
                    >
                      See details
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BillsCardSection;
