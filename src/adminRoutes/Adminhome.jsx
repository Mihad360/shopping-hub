import { useSelector } from "react-redux";
import { useGetAdminstatsQuery } from "../redux/baseapi/baseApi";
import Loading from "../components/Loading";
import { FaSitemap, FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import Orderstats from "./Orderstats";
import useAuth from "../hooks/useAuth";

const Adminhome = () => {
  const { data: adminStats = [], isLoading } = useGetAdminstatsQuery();

  const { users, shopItems, checkouts, revenue } = adminStats;

  if (isLoading) {
    return <div className="mx-auto w-32 py-72">
    <Loading></Loading>
  </div>;
  }

  return (
    <div className=" pt-4 pb-10">
      <div className="">
        {/* Header Section */}
        {/* <div className="mb-6 te xt-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {name}</h1>
          <p className="text-gray-600">Email: {email}</p>
        </div> */}
        <h1
          className="text-2xl font-bold text-green-600 text-center pb-4"
        >
          Oder Stats
        </h1>
        {/* Dashboard Stats */}
        <div className="">
          <div className="flex justify-center gap-4 w-full pb-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-56">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Users
              </h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#ff582e] mt-2">
                <FaUsers />
                {users}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-56">
              <h2 className="text-xl font-semibold text-gray-800">
                Shop Items
              </h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#ed9b2c] mt-2">
                <FaSitemap />
                {shopItems}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-56">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Checkouts
              </h2>
              <p className="text-3xl flex items-center justify-center gap-5 font-bold text-[#2c69ed] mt-2">
                <FaListCheck />
                {checkouts}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-60">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Revenue
              </h2>
              <p className="text-2xl flex items-center justify-center gap-5 font-bold text-[#f646cd] mt-2">
                <TbCoinTakaFilled />
                {revenue} TK
              </p>
            </div>
          </div>
          <div className="">
            <Orderstats></Orderstats>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
