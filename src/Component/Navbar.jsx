import React, { useContext } from "react";
import { FcBrokenLink } from "react-icons/fc";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { LogOutFunc, user,loading } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    LogOutFunc()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
    <div className="navbar bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-1">
          <FcBrokenLink className="text-2xl" />
          <Link to="/" className="lg:text-2xl font-bold">
            Smart<span className="text-[#023e8a]">Utility</span>
          </Link>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {
          loading?<span className="loading loading-spinner text-info"></span>:user ? (
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
              <img
                src={
                   user.photoURL || "https://i.ibb.co/2WZf3hY/default-avatar.png"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-[#0077b6]"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn bg-[#0077b6] text-white font-bold font-serif hover:scale-105"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn mr-2 bg-[#0077b6] text-white font-bold font-serif hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-[#00b4d8] text-white font-bold font-serif hover:scale-105"
            >
              Register
            </Link>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Navbar;
