import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoLogInOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import Img from "../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-[#5633e4] border-b-2 border-[#8755ea]"
        : "text-gray-700 hover:text-[#5633e4]"
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
    setOpen(false);
  };

  return (
    <nav className="bg-gray-400 shadow-sm sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img src={Img} alt="PawMart Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-gray-800">
              Paw<span className="text-orange-500">Mart</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">{links}</div>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 relative">
            {user ? (
              <>
                <div
                  className="relative group mr-5"
                  onClick={() => setAvatarDropdown(!avatarDropdown)}
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName ? `${user.displayName}'s avatar` : "User Avatar"}
                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  />
                  {/* Hover tooltip for name */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                    {user.displayName || "User"}
                  </div>

                  {/* Dropdown */}
                  {avatarDropdown && (
                    <div className="absolute -right-10 mt-2 w-28 bg-gray-400 rounded-b-md shadow-lg flex flex-col z-50">
                      <Link
                        to="/myProfile"
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-center font-semibold"
                        onClick={() => setAvatarDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-gray-700 text-center hover:bg-gray-100 rounded-b-md cursor-pointer font-semibold "
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-1 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white px-3 py-2 rounded-md hover:scale-105 transition-transform"
              >
                <IoLogInOutline />
                LogIn
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 focus:outline-none"
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

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            {links}
            {user ? (
              <>
                {/* User Tooltip & Buttons */}
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || "User"}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="font-semibold text-gray-800">
                    {user.displayName || "User"}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white px-3 py-2 rounded-md w-full justify-center"
                >
                  <IoLogInOutline className="rotate-180" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white px-3 py-2 rounded-md justify-center"
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
