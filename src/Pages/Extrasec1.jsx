import React from "react";
import { FaLightbulb, FaFire, FaTint, FaWifi } from "react-icons/fa";

const EnergySavingTips = () => {
  return (
    <section className="bg-blue-50 py-14 px-6 rounded-xl">
      <h2 className="text-3xl font-bold text-center text-[#101828] mb-10">
        Energy Saving Tips
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <FaLightbulb className="text-yellow-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-[#101828] mb-2">
            Save Electricity
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed text-justify">
            Turn off lights, fans, and appliances when not in use. Replace old
            bulbs with LED lights to reduce energy consumption and cost.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <FaFire className="text-red-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-[#101828] mb-2">Save Gas</h3>
          <p className="text-gray-600 text-sm leading-relaxed text-justify">
            Use energy-efficient stoves and cook with lids on pots. This reduces
            gas usage and helps food cook faster, saving time and money.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <FaTint className="text-blue-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-[#101828] mb-2">
            Save Water
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed text-justify">
            Repair leaking taps immediately. Collect rainwater for gardening and
            avoid unnecessary water waste while cleaning or washing.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <FaWifi className="text-green-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-[#101828] mb-2">
            Optimize Internet
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed text-justify">
            Disconnect idle devices to improve bandwidth speed. Regularly update
            your router firmware for better connectivity and efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnergySavingTips;
