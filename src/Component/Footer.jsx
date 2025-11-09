import React from "react";
import { FcBrokenLink } from "react-icons/fc";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3 ">
             <span className='text-2xl'> <FcBrokenLink /></span>
            <h2 className="text-2xl font-bold text-white">Smart Utility</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed text-justify">
            Smart Utility helps you manage your bills, monitor usage, and stay
            on top of your daily utilities efficiently and securely.
          </p>
        </div>

        {/* Useful Links */}
        <div className="lg:ml-8">
          <h3 className="text-xl font-semibold text-white mb-4 ">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400 mb-2">
            Email: support@smartutility.com
          </p>
          <p className="text-sm text-gray-400 mb-2">Phone: +880 1234-567890</p>
          <p className="text-sm text-gray-400">Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {year} Smart Utility — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
