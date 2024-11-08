import { RiAdminFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div>
        <div className="flex items-center gap-4">
          <p>
            <NavLink
              to="/dashboard/adminhome"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-pink-600 font-bold"
                  : ""
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
              to="/dashboard/adminhome"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-pink-600 font-bold"
                  : ""
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
              to="/dashboard/adminhome"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-pink-600 font-bold"
                  : ""
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
              to="/dashboard/adminhome"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-pink-600 font-bold"
                  : ""
              }
            >
              <span className="flex items-center gap-1 lg:gap-2">
                <RiAdminFill />
                All Users
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
                  ? "text-pink-600 font-bold"
                  : ""
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
                  ? "text-pink-600 font-bold"
                  : ""
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
                  ? "text-pink-600 font-bold"
                  : ""
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
                  ? "text-pink-600 font-bold"
                  : ""
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
                  ? "text-pink-600 font-bold"
                  : ""
              }
            >
              <span className="flex items-center gap-1 lg:gap-2">
                <RiAdminFill />
                Reviews
              </span>
            </NavLink>
          </p>
          {/* -------------------------- */}
          <p>/</p>
          {/* ------------------- */}
          <p>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-pink-600 font-bold"
                  : ""
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
                  ? "text-pink-600 font-bold"
                  : ""
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
                  ? "text-pink-600 font-bold"
                  : ""
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
