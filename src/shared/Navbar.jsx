import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus, FaShopify } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useGetCartQuery, useGetIsAdminQuery } from "../redux/baseapi/baseApi";
import useAuth from "../hooks/useAuth";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isdrop, setIsDrop] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const { data } = useGetCartQuery(user?.email);
  const { data: isAdmin } = useGetIsAdminQuery(user?.email);
  console.log(isAdmin?.admin);

  const handleLogout = async () => {
    await logout();
  };

  const toggleDropdown = () => {
    setIsDrop(!isdrop);
  };

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
      <div className="text-black container mx-auto flex items-center justify-between py-3 font-medium">
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

        {/* Links - Visible on desktop */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
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
          {user && !isAdmin?.admin ? (
            <NavLink
              to="/dashboard/userhome"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              Dashboard
            </NavLink>
          ) : (
            ""
          )}
          {user && isAdmin?.admin ? (
            <NavLink
              to="/dashboard/adminhome"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "hover:text-green-400"
              }
            >
              Dashboard
            </NavLink>
          ) : (
            ""
          )}
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
              to="/dashboard/cart"
              className={({ isActive }) => (isActive ? "" : "")}
            >
              <p className="flex items-center gap-2">
                <FaCartPlus className="text-2xl text-black" />
                <span className="">{data?.length}</span>
              </p>
            </NavLink>
          </p>
          {!user && (
            <Link to="/signin" className="hover:text-green-400 hover:underline">
              Sign In
            </Link>
          )}
          {/* Profile Dropdown */}
          <div className="flex items-center gap-4">
            {user ? (
              <img
                className="w-12 h-12 rounded-[100%]"
                src={user?.photoURL}
                alt={user?.displayName}
              />
            ) : (
              <p className="text-3xl">
                <CgProfile />
              </p>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-lg text-rose-500 font-medium flex items-center gap-2 hover:bg-slate-400 duration-300 transition-all rounded-xl px-3 py-1"
              >
                <LogOut /> Log Out
              </button>
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
              <NavLink to="/cart">
                <p className="flex items-center gap-1">
                  <FaCartPlus className="text-2xl" />
                  <span>0</span>
                </p>
              </NavLink>
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
