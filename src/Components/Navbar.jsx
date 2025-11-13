import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoLogInOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import Img from "../assets/logo.png";
import ThemeToggle from "./Theme/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [showName, setShowName] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-[#5633e4] border-b-2 border-[#8755ea]"
        : "text-gray-700 dark:text-gray-200 hover:text-[#8755ea] hover:scale-105"
    }`;

  const links = (
    <>
      <NavLink className={linkClass} to="/">
        Home
      </NavLink>
      <NavLink className={linkClass} to="/petsSupplies">
        Pets & Supplies
      </NavLink>

      {user && (
        <>
          <NavLink className={linkClass} to="/addListing">
            Add Listing
          </NavLink>
          <NavLink className={linkClass} to="/myListing">
            My Listing
          </NavLink>
          <NavLink className={linkClass} to="/myOrder">
            My Orders
          </NavLink>
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => toast.success("Sign-out successful"))
      .catch((err) => toast.error(err.message));
    setAvatarDropdown(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={Img}
              alt="PawMart Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
              Paw<span className="text-orange-500">Mart</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">{links}</div>

          {/* Desktop Theme + Avatar */}
          <div className="hidden md:flex items-center gap-4 relative">
            <div className="">
              <ThemeToggle />
            </div>

            {user ? (
              <div className="relative flex items-center">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName || "User Avatar"}
                  className="w-10 h-10 rounded-full border-2 shadow-md cursor-pointer hover:ring-2 hover:ring-[#5633e4] transition-all duration-300"
                  onMouseEnter={() => setShowName(true)}
                  onMouseLeave={() => setShowName(false)}
                  onClick={() => setAvatarDropdown(!avatarDropdown)}
                />

                {showName && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[52px] text-center bg-gray-800 text-white text-xs px-2 py-1 rounded-b shadow-md">
                    {user.displayName || "User"}
                  </div>
                )}

                {avatarDropdown && (
                  <div className="absolute -right-14 mt-36 w-36 bg-white dark:bg-gray-800 rounded-b-xl shadow-lg flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-gray-800">
                    <Link
                      to="/myProfile"
                      className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors text-center"
                      onClick={() => setAvatarDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 text-gray-700 text-center cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-1 backdrop-blur-lg bg-white/10 dark:text-white px-3 py-2 rounded-lg hover:scale-105 transition-transform font-semibold shadow-md"
              >
                <IoLogInOutline />
                LogIn
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {open ? (
                <IoCloseSharp className="w-6 h-6" />
              ) : (
                <GiHamburgerMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 animate-slideDown">
          <div className="px-4 pt-2 pb-4 flex flex-col gap-3">
            {links}
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || "User"}
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                  />
                  <span className="font-semibold text-gray-800 dark:text-white text-sm">
                    {user.displayName || "User"}
                  </span>
                </div>
                <Link
                  to="/myProfile"
                  className="px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white px-3 py-2 rounded-md w-full justify-center font-semibold shadow-md text-sm"
                >
                  <IoLogInOutline className="rotate-180" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white px-3 py-2 rounded-md justify-center font-semibold shadow-md text-sm"
              >
                <IoLogInOutline />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
