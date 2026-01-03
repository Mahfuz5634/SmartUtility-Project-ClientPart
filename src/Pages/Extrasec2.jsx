import React from "react";

const AboutSmartUtility = () => {
  return (
    <section className="relative py-16 px-6 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-100/70 dark:border-slate-700 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 shadow-sm mb-4">
          🌍 Built for modern households in Bangladesh
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] dark:text-white mb-4 tracking-tight">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            Smart Utility
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl mx-auto mb-8">
          A single, secure platform to manage all your essential monthly
          utilities without the stress of juggling multiple apps or paper bills.
        </p>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-white/70 dark:border-slate-700 shadow-xl p-6 sm:p-8 text-left">
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-4">
            <span className="font-semibold text-[#023e8a] dark:text-sky-300">
              Smart Utility
            </span>{" "}
            is a modern platform designed to bring all of your monthly utility
            bills into one organized, easy-to-use dashboard. From electricity
            and gas to water and internet, Smart Utility helps you track due
            dates, stay on top of payments, and reduce the chances of missed
            bills.
          </p>

          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-5">
            The core mission is simple: promote efficient resource usage,
            minimize waste, and make smart bill management accessible to every
            household across Bangladesh. By giving you clear visibility into
            your spending and usage patterns, Smart Utility empowers you to make
            better financial and environmental decisions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                What you can do
              </span>
              <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>View all recent and past utility bills in one place.</li>
                <li>
                  Track monthly spending on electricity, gas, water, and more.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                Why it matters
              </span>
              <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Avoid missed payments and late fees.</li>
                <li>Understand patterns and plan your budget better.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                Bigger impact
              </span>
              <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Adopt energy-saving habits with practical tips.</li>
                <li>
                  Contribute to a more sustainable, resource-efficient future.
                </li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed border-t border-dashed border-slate-200 dark:border-slate-700 pt-4">
            Smart Utility is built on the belief that small, consistent changes
            in how we manage our daily utilities can create a{" "}
            <span className="font-semibold">meaningful long-term impact</span>{" "}
            for families, communities, and the environment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSmartUtility;
