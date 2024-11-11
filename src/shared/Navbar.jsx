import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus, FaShopify } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { setLogout } from "../redux/features/userSlice";

const Navbar = () => {
  // State to handle menu toggle
  const [isOpen, setIsOpen] = useState(false);
  const [isdrop, setIsDrop] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth);
    dispatch(setLogout());
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDrop(!isOpen);
  };
  // Toggle menu function
  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-gray-100 z-50 fixed">
      <div className="text-black max-w-[1400px] mx-auto flex items-center justify-between py-4 font-medium">
        {/* Logo */}
        <div className="font-semibold">
          <NavLink to="/">
            <p className="flex items-center gap-4">
              <FaShopify className="text-4xl" />
              <span className="text-2xl">ShopHub</span>
            </p>
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/3000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links - Visible on desktop, hidden on mobile */}
        <div className="hidden md:flex space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-green-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-green-400"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-green-400"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              isActive ? "text-green-500 font-bold" : "hover:text-green-400"
            }
          >
            Contact Us
          </NavLink>
          <p className="bg-green-500 hover:bg-green-400 font-bold rounded-3xl px-2">
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "" : "")}
            >
              <p className="flex items-center gap-2">
                <FaCartPlus className="text-2xl text-black" />
                <span className="">0</span>
              </p>
            </NavLink>
          </p>
          <Link to="/signin" className="hover:text-green-400 hover:underline">
            Sign In
          </Link>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Profile Icon that toggles the dropdown */}
            <p
              onClick={toggleDropdown}
              className="flex items-center cursor-pointer text-gray-600 hover:text-green-400"
            >
              <CgProfile className="text-3xl" />
            </p>

            {/* Dropdown Content */}
            {isdrop && (
              <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10
            transition-all duration-200 transform ${
              isdrop ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
              >
                {/* Cross Icon */}
                <div className="flex justify-end p-2">
                  <AiOutlineClose
                    onClick={() => setIsDrop(false)}
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                  />
                </div>
                <ul className="py-1">
                  <button className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-700 w-full text-left">
                    <li>Profile</li>
                  </button>
                  <button className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-700 w-full text-left">
                    <li>Settings</li>
                  </button>
                  <button onClick={handleLogout} className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-700 w-full text-left">
                    <li>Logout</li>
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-500 shadow-md flex flex-col space-y-4 py-4 px-6 z-10">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/contactus"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              Contact Us
            </NavLink>
            <p className="bg-green-400 font-bold rounded-3xl px-2">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-green-400 font-bold" : "hover:"
                }
              >
                <p className="flex items-center gap-1">
                  <FaCartPlus className="text-2xl" />
                  <span>0</span>
                </p>
              </NavLink>
            </p>
            <NavLink
              to="/profile"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              <CgProfile />
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
