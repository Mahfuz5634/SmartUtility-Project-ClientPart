import React from "react";
import { FaLightbulb, FaFire, FaTint, FaWifi } from "react-icons/fa";

const EnergySavingTips = () => {
  return (
    <section className="relative py-14 px-6 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-3xl">
      {/* soft background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-emerald-100/70 dark:border-slate-700 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-sm">
            🌱 Small changes, big impact
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#101828] dark:text-white tracking-tight">
            Energy Saving{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500">
              Tips
            </span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Reduce your monthly utility costs and support a more sustainable
            lifestyle with these practical, everyday habits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Electricity */}
          <div className="group bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-md hover:shadow-2xl border border-slate-100/80 dark:border-slate-700/80 backdrop-blur-md p-6 transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 mb-4">
              <FaLightbulb className="text-amber-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#101828] dark:text-white mb-2">
              Save Electricity
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify">
              Turn off lights, fans, and appliances when not in use. Replace old
              bulbs with LED lights to reduce energy consumption and cost.
            </p>
          </div>

          {/* Gas */}
          <div className="group bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-md hover:shadow-2xl border border-slate-100/80 dark:border-slate-700/80 backdrop-blur-md p-6 transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/30 mb-4">
              <FaFire className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#101828] dark:text-white mb-2">
              Save Gas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify">
              Use energy-efficient stoves and cook with lids on pots. This
              reduces gas usage and helps food cook faster, saving time and
              money.
            </p>
          </div>

          {/* Water */}
          <div className="group bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-md hover:shadow-2xl border border-slate-100/80 dark:border-slate-700/80 backdrop-blur-md p-6 transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-900/30 mb-4">
              <FaTint className="text-sky-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#101828] dark:text-white mb-2">
              Save Water
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify">
              Repair leaking taps immediately. Collect rainwater for gardening
              and avoid unnecessary water waste while cleaning or washing.
            </p>
          </div>

          {/* Internet */}
          <div className="group bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-md hover:shadow-2xl border border-slate-100/80 dark:border-slate-700/80 backdrop-blur-md p-6 transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 mb-4">
              <FaWifi className="text-emerald-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#101828] dark:text-white mb-2">
              Optimize Internet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify">
              Disconnect idle devices to improve bandwidth speed. Regularly
              update your router firmware for better connectivity and
              efficiency.
            </p>
          </div>
        </div>

        {/* bottom note */}
        <p className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Start with one habit at a time—consistent small steps can significantly
          lower your monthly bills over time.
        </p>
      </div>
    </section>
  );
};

export default EnergySavingTips;
