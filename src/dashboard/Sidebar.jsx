import { FaHistory, FaHome, FaShopify, FaUsers } from "react-icons/fa";
import { FaBook, FaCartPlus, FaShop, FaUser } from "react-icons/fa6";
import { MdOutlineManageHistory, MdOutlinePostAdd } from "react-icons/md";
import { RiAdminFill, RiContactsBook3Fill } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { useGetIsAdminQuery } from "../redux/baseapi/baseApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";

const Sidebar = () => {
  const [isAddItemsOpen, setIsAddItemsOpen] = useState(false);
  const [isManageItemsOpen, setIsManageItemsOpen] = useState(false);
  const { email } = useSelector((state) => state.userSlice.user);
  const { data: isAdmin } = useGetIsAdminQuery(email);

  return (
    <div className="min-h-screen w-72 text-green-800 p-6">
      <div className="mb-8">
        <h1 className="text-black flex items-center gap-3 pb-3 border-b-green-300 border-b-2">
          <FaShopify className="text-4xl" />
          <span className="text-2xl font-bold">ShopHub</span>
        </h1>
        <h2 className="text-xl font-bold text-green-600 mb-6 border-b-2 border-green-300 pb-2 pt-3 flex items-center gap-3">
          Dashboard <BiSolidDashboard className="text-black" />
        </h2>
        {isAdmin?.admin ? (
          <div className="space-y-3 text-gray-900">
            <NavLink
              to="/dashboard/adminhome"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <RiAdminFill className="mr-3 text-xl" />
              <span className="font-medium">Admin Home</span>
            </NavLink>
            <div className="relative">
              <button
                onClick={() => setIsAddItemsOpen(!isAddItemsOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-green-100 transition-all duration-300 hover:shadow-md"
              >
                <span className="flex items-center">
                  <MdOutlinePostAdd className="mr-3 text-xl" />
                  <span className="font-medium">Add Items</span>
                </span>
                <span className="transform transition-transform duration-300 text-sm">
                  {isAddItemsOpen ? "▲" : "▼"}
                </span>
              </button>
              {isAddItemsOpen && (
                <div className="pl-6 mt-2 space-y-2 transition-all duration-300">
                  <NavLink
                    to="/dashboard/additem"
                    className={({ isActive }) =>
                      `block p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-green-500 text-white shadow-sm"
                          : "hover:bg-green-600 hover:text-white hover:shadow-sm"
                      }`
                    }
                  >
                    Add Shop Items
                  </NavLink>
                  <NavLink
                    to="/dashboard/addnewarrival"
                    className={({ isActive }) =>
                      `block p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-green-500 text-white shadow-sm"
                          : "hover:bg-green-600 hover:text-white hover:shadow-sm"
                      }`
                    }
                  >
                    Add New Arrival
                  </NavLink>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsManageItemsOpen(!isManageItemsOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-green-100 transition-all duration-300 hover:shadow-md"
              >
                <span className="flex items-center">
                  <MdOutlineManageHistory className="mr-3 text-xl" />
                  <span className="font-medium">Manage Items</span>
                </span>
                <span className="transform transition-transform duration-300 text-sm">
                  {isManageItemsOpen ? "▲" : "▼"}
                </span>
              </button>
              {isManageItemsOpen && (
                <div className="pl-6 mt-2 space-y-2 transition-all duration-300">
                  <NavLink
                    to="/dashboard/manageshopitems"
                    className={({ isActive }) =>
                      `block p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-green-500 text-white shadow-sm"
                          : "hover:bg-green-600 hover:text-white hover:shadow-sm"
                      }`
                    }
                  >
                    Manage Shop Items
                  </NavLink>
                  <NavLink
                    to="/dashboard/managenewarrival"
                    className={({ isActive }) =>
                      `block p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-green-500 text-white shadow-sm"
                          : "hover:bg-green-600 hover:text-white hover:shadow-sm"
                      }`
                    }
                  >
                    Manage New Arrival
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              to="/dashboard/allusers"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <FaUsers className="mr-3 text-xl" />
              <span className="font-medium">All Users</span>
            </NavLink>
          </div>
        ) : (
          <div className="space-y-3 text-gray-900">
            <NavLink
              to="/dashboard/userhome"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <FaUser className="mr-3 text-xl" />
              <span className="font-medium">User Home</span>
            </NavLink>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <FaCartPlus className="mr-3 text-xl" />
              <span className="font-medium">Cart Items</span>
            </NavLink>
            <NavLink
              to="/dashboard/payment"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <FaBook className="mr-3 text-xl" />
              <span className="font-medium">Payment</span>
            </NavLink>
            <NavLink
              to="/dashboard/paymenthistory"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <FaHistory className="mr-3 text-xl" />
              <span className="font-medium">Payment History</span>
            </NavLink>
            <NavLink
              to="/dashboard/reviews"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md transform scale-105"
                    : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
                }`
              }
            >
              <VscPreview className="mr-3 text-xl" />
              <span className="font-medium">Reviews</span>
            </NavLink>
          </div>
        )}
      </div>
      <div className="space-y-3 border-t-2 text-gray-900 border-green-300 pt-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-green-600 text-white shadow-md transform scale-105"
                : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
            }`
          }
        >
          <FaHome className="mr-3 text-xl" />
          <span className="font-medium">Home</span>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-green-600 text-white shadow-md transform scale-105"
                : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
            }`
          }
        >
          <FaShop className="mr-3 text-xl" />
          <span className="font-medium">Shop</span>
        </NavLink>
        <NavLink
          to="/contactus"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-green-600 text-white shadow-md transform scale-105"
                : "hover:bg-green-600 hover:text-white hover:shadow-md hover:scale-105"
            }`
          }
        >
          <RiContactsBook3Fill className="mr-3 text-xl" />
          <span className="font-medium">Contact Us</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
