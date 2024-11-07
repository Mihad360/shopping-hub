import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus, FaShopify } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // State to handle menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className=" text-white shadow-md bg-blue-500">
      <div className=" max-w-[1400px] mx-auto flex items-center justify-between py-4 text-white">
        {/* Logo */}
        <div className="font-semibold">
          <NavLink to="/" className="hover:text-gray-200">
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
              xmlns="http://www.w3.org/2000/svg"
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
              isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
            }
          >
            Contact Us
          </NavLink>
          <p className="bg-amber-500 font-bold rounded-3xl px-2">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
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
            className={({ isActive }) =>
              isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
            }
          >
            <CgProfile className="text-3xl" />
          </NavLink>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-500 shadow-md flex flex-col space-y-4 py-4 px-6 z-10">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/contact"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
              }
            >
              Contact Us
            </NavLink>
            <p className="bg-amber-400 font-bold rounded-3xl px-2">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
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
                isActive ? "text-amber-400 font-bold" : "hover:text-gray-200"
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
