import React from "react";
import { FcBrokenLink } from "react-icons/fc";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const link = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `lg:mr-4 font-serif font-bold ${
            isActive ? "text-[#0077b6] underline" : "text-[#101828]"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/allbills"
        className={({ isActive }) =>
          `lg:mr-4 font-serif font-bold ${
            isActive ? "text-[#0077b6] underline" : "text-[#101828]"
          }`
        }
      >
        Bills
      </NavLink>

      <NavLink
        to="/mypaybills"
        className={({ isActive }) =>
          `lg:mr-4 font-serif font-bold ${
            isActive ? "text-[#0077b6] underline" : "text-[#101828]"
          }`
        }
      >
        My Pay Bills
      </NavLink>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-2xl">
                {" "}
                <FcBrokenLink />
              </span>
            </div>
            <a className="lg:text-2xl font-bold ">
              Smart<span className="text-[#023e8a]">Utility</span>
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn mr-2 bg-[#0077b6] text-white font-bold font-serif hover:scale-105 ">
            Login
          </a>
          <a className="btn mr-2 bg-[#00b4d8] text-white font-bold font-serif hover:scale-105">
            Register
          </a>
          <a className="btn mr-2 bg-[#0077b6] text-white font-bold font-serif hover:scale-105 ">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
