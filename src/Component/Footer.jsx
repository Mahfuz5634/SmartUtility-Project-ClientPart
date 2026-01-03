import React from "react";
import { FcBrokenLink } from "react-icons/fc";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">
              <FcBrokenLink />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                Smart Utility
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">
                Manage · Track · Save
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed text-justify">
            Smart Utility helps you manage your bills, monitor usage, and stay
            on top of your daily utilities efficiently and securely, all in one
            dashboard.
          </p>
        </div>

        {/* Useful Links */}
        <div className="md:pl-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <span className="h-[2px] w-3 bg-blue-500 rounded-full" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <span className="h-[2px] w-3 bg-blue-500 rounded-full" />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <span className="h-[2px] w-3 bg-blue-500 rounded-full" />
                <span>Services</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <span className="h-[2px] w-3 bg-blue-500 rounded-full" />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              Email:{" "}
              <a
                href="mailto:support@smartutility.com"
                className="text-blue-400 hover:underline"
              >
                support@smartutility.com
              </a>
            </p>
            <p>Phone: +880 1234-567890</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-1">
              Stay updated on new features and tips:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-gray-200 text-xs border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-semibold text-white hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500">
        © {year} Smart Utility — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
