import { FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { FaBook, FaCartPlus, FaShop, FaUser } from "react-icons/fa6";
import { MdOutlineManageHistory, MdOutlinePostAdd } from "react-icons/md";
import { RiAdminFill, RiContactsBook3Fill } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import { useGetIsAdminQuery } from "../redux/baseapi/baseApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useSelector((state) => state.userSlice.user);
  const { data: isAdmin } = useGetIsAdminQuery(email);
  console.log(isAdmin);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div>
        <div className="flex items-center gap-4 justify-center pb-3 pt-2 fixed z-30 w-[1400px] mx-auto bg-gray-100">
          {isAdmin?.admin ? (
            <div className="flex items-center gap-4 ">
              <p>
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <RiAdminFill />
                    Admin Home
                  </span>
                </NavLink>
              </p>
              {/* <p>
                <NavLink
                  to="/dashboard/additem"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                  <MdOutlinePostAdd />
                    Add Items
                  </span>
                </NavLink>
              </p> */}
              <div className="relative inline-block text-left">
                {/* Main Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-green-600 btn btn-sm px-4 text-white hover:bg-green-400 flex items-center gap-2"
                >
                  ▼
                  Add Items
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    {/* Cross Button */}
                    <div className="flex justify-end p-2">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineClose size={20} />
                      </button>
                    </div>
                    {/* Dropdown Items */}
                    <div className="">
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        to="/dashboard/additem"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? " block font-semibold text-black hover:bg-green-400"
                            : "block hover:bg-green-400"
                        }
                      >
                        <span className="flex items-center gap-1 text-black px-4 py-2">
                          <MdOutlinePostAdd />
                          Add Shop Items
                        </span>
                      </NavLink>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        to="/dashboard/addnewarrival"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "block font-semibold text-black hover:bg-green-400"
                            : "block hover:bg-green-400"
                        }
                      >
                        <span className="flex items-center gap-1 text-black px-4 py-2">
                          <MdOutlinePostAdd />
                          Add New Arrival
                        </span>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
              <p>
                <NavLink
                  to="/dashboard/manageitems"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <MdOutlineManageHistory />
                    Manage Items
                  </span>
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/dashboard/allusers"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <FaUsers />
                    All Users
                  </span>
                </NavLink>
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p>
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <FaUser />
                    User Home
                  </span>
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <FaCartPlus />
                    Cart Items
                  </span>
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <FaBook />
                    Payment
                  </span>
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <FaHistory />
                    Payment History
                  </span>
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <VscPreview />
                    Reviews
                  </span>
                </NavLink>
              </p>
            </div>
          )}
          {/* -------------------------- */}
          <h1 className="text-3xl px-4 font-semibold text-black pt-2 pb-3 text-center">
            Shop Dashboard
          </h1>
          {/* ------------------- */}
          <p>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                  : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
              }
            >
              <span className="flex items-center gap-1 lg:gap-2">
                <FaHome />
                Home
              </span>
            </NavLink>
          </p>
          <p>
            <NavLink
              to="/shop"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                  : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
              }
            >
              <span className="flex items-center gap-1 lg:gap-2">
                <FaShop />
                Shop
              </span>
            </NavLink>
          </p>
          <p>
            <NavLink
              to="/contactus"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                  : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
              }
            >
              <span className="flex items-center gap-1 lg:gap-2">
                <RiContactsBook3Fill />
                Contact Us
              </span>
            </NavLink>
          </p>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
