import React, { useContext, useEffect, useState } from "react";
import { FcBrokenLink } from "react-icons/fc";
import { HiMenu, HiX } from "react-icons/hi";
import {
  HiHome,
  HiDocumentText,
  HiQuestionMarkCircle,
  HiCurrencyDollar,
} from "react-icons/hi";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { LogOutFunc, user, loading } = useContext(AuthContext);
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    LogOutFunc()
      .then(() => {
        toast.success("Logout Successfully");
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-serif font-semibold ${
      isActive
        ? "text-[#0077b6] bg-[#e0f2fe]"
        : "text-[#101828] dark:text-white hover:text-[#0077b6]"
    }`;

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const links = (
    <>
      <NavLink to="/" className={linkClasses} onClick={handleNavClick}>
        <HiHome className="text-lg" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/allbills" className={linkClasses} onClick={handleNavClick}>
        <HiDocumentText className="text-lg" />
        <span>Bills</span>
      </NavLink>

      {loading ? (
        <span className="loading loading-spinner w-[15px] text-info"></span>
      ) : (
        user && (
          <NavLink
            to="/mypaybills"
            className={linkClasses}
            onClick={handleNavClick}
          >
            <HiCurrencyDollar className="text-lg" />
            <span>My Pay Bills</span>
          </NavLink>
        )
      )}

      <NavLink to="/faq" className={linkClasses} onClick={handleNavClick}>
        <HiQuestionMarkCircle className="text-lg" />
        <span>FAQ</span>
      </NavLink>
    </>
  );

  return (
    <nav className="bg-base-100 border-b border-base-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* top row */}
        <div className="flex items-center justify-between h-16">
          {/* left: toggle + logo */}
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm px-2 lg:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <FcBrokenLink className="text-3xl hidden sm:block" />
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight">
                Smart<span className="text-[#023e8a]">Utility</span>
              </span>
            </Link>
          </div>

          {/* center: desktop nav */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
          </div>

          {/* right: theme + auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* theme toggle */}
            <label className="swap swap-rotate">
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                defaultChecked={localStorage.getItem("theme") === "dark"}
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              <svg
                className="swap-off h-6 w-6 sm:h-7 sm:w-7 fill-current text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-on h-6 w-6 sm:h-7 sm:w-7 fill-current text-slate-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {loading ? (
              <span className="loading loading-spinner text-info"></span>
            ) : user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="tooltip tooltip-bottom hidden xs:block"
                  data-tip={user.displayName || "User"}
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/2WZf3hY/default-avatar.png"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0077b6]"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-xs sm:btn-sm px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-semibold font-serif shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="btn btn-xs sm:btn-sm bg-[#0077b6] text-white font-semibold font-serif hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-xs sm:btn-sm bg-[#00b4d8] text-white font-semibold font-serif hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-3">
            <ul className="menu menu-vertical bg-base-100 rounded-box shadow px-2 py-3 space-y-1 w-full">
              {links}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
