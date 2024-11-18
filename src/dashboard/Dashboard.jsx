import { RiAdminFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import { useGetIsAdminQuery } from "../redux/baseapi/baseApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {email} = useSelector(state => state.userSlice.user)
  const {data: isAdmin} = useGetIsAdminQuery(email)
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
              <p>
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
                    <RiAdminFill />
                    Add Items
                  </span>
                </NavLink>
              </p>
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
                    <RiAdminFill />
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
                    <RiAdminFill />
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
                    <RiAdminFill />
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
                    <RiAdminFill />
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
                    <RiAdminFill />
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
                    <RiAdminFill />
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
                    <RiAdminFill />
                    Reviews
                  </span>
                </NavLink>
              </p>
            </div>
          )}
          {/* -------------------------- */}
          <h1 className="text-3xl px-4 font-semibold text-black pt-2 pb-3 text-center">Shop Dashboard</h1>
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
                <RiAdminFill />
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
                <RiAdminFill />
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
                <RiAdminFill />
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
