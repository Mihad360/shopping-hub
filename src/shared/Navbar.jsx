import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus, FaShopify } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { setLogout } from "../redux/features/userSlice";
import { useGetCartQuery } from "../redux/baseapi/baseApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isdrop, setIsDrop] = useState(false);
  const dropdownRef = useRef(null);
  const { email, image, name } = useSelector((state) => state.userSlice.user);
  const { data } = useGetCartQuery(email);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth);
    dispatch(setLogout());
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
          <button onClick={toggleMenu} className="focus:outline-none text-white">
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
              to="/dashboard/cart"
              className={({ isActive }) => (isActive ? "" : "")}
            >
              <p className="flex items-center gap-2">
                <FaCartPlus className="text-2xl text-black" />
                <span className="">{data?.length}</span>
              </p>
            </NavLink>
          </p>
          {!email && (
            <Link to="/signin" className="hover:text-green-400 hover:underline">
              Sign In
            </Link>
          )}
          {/* Profile Dropdown */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center cursor-pointer text-gray-600 hover:text-green-400"
            >
              {email && image ? (
                <img
                  className="w-12 h-12 rounded-full"
                  src={image}
                  alt="Profile"
                />
              ) : (
                <CgProfile className="text-3xl" />
              )}
            </button>

            {/* Dropdown Content */}
            {isdrop && (
              <div className="absolute right-0 mt-2 min-w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex justify-end p-2">
                  <AiOutlineClose
                    onClick={() => setIsDrop(false)}
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                  />
                </div>
                <div>
                  {
                    email ? <div className="bg-green-500 text-center rounded-lg p-2 mx-3">
                      <img className="w-16 h-16 rounded-full mx-auto" src={image} alt={image} />
                    <h1 className="text-lg text-white font-semibold">{name}</h1>
                    <p className="text-base underline">{email}</p>
                  </div> : ""
                  }
                </div>
                <ul className="py-1">
                  <button className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-700 w-full text-right">
                    <li>Profile</li>
                  </button>
                  <button className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-700 w-full text-right">
                    <li>Settings</li>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-700 w-full text-right"
                  >
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
