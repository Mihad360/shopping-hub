import { useSelector } from "react-redux";
import { useGetAdminstatsQuery } from "../redux/baseapi/baseApi";
import Loading from "../components/Loading";
import { FaSitemap, FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import Orderstats from "./Orderstats";

const Adminhome = () => {
  const { name, email } = useSelector((state) => state.userSlice.user);
  const { data: adminStats = [], isLoading } = useGetAdminstatsQuery();

  const { users, shopItems, orders, revenue } = adminStats;

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className=" p-5">
      <div className="">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {name}</h1>
          <p className="text-gray-600">Email: {email}</p>
        </div>

        {/* Dashboard Stats */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-4 w-64">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Users
              </h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#ff582e] mt-2">
                <FaUsers />
                {users}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Shop Items
              </h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#ed9b2c] mt-2">
                <FaSitemap />
                {shopItems}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Orders
              </h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#2c69ed] mt-2">
                <FaListCheck />
                {orders}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Revenue</h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#f646cd] mt-2">
                <TbCoinTakaFilled />
                {revenue} TK
              </p>
            </div>
          </div>
          <div>
            <Orderstats></Orderstats>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
