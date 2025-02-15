import { Chart } from "react-chartjs-2";
import { ShoppingCart, Package } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useGetUserstatsQuery } from "../redux/baseapi/baseApi";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { TbCoinTaka } from "react-icons/tb";
import Loading from "../components/Loading";

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    LineController
  );

const UserHome = () => {
  const { user } = useAuth();
  const { data: userStats = {}, isLoading } = useGetUserstatsQuery();
  const { checkoutCount, userData } = userStats;

  if (isLoading) {
    return (
      <div className="mx-auto w-32 py-72">
        <Loading></Loading>
      </div>
    );
  }
  // Prepare Mixed Chart Data (Bar + Line)
  const chartData = {
    labels: userData?.map((item) => item.category),
    datasets: [
      {
        label: "Revenue",
        type: "bar",
        data: userData?.map((item) => item.revenue),
        backgroundColor: "rgba(27, 235, 147,0.5 )",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Quantity Sold",
        type: "line",
        data: userData?.map((item) => item.quantity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
        User Stats
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <ShoppingCart className="text-blue-500 w-10 h-10 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Checkouts
            </h3>
            <p className="text-2xl font-bold text-gray-900">{checkoutCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <TbCoinTaka className="text-green-500 w-10 h-10 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {userData?.reduce((acc, item) => acc + item.revenue, 0)} TK
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <Package className="text-orange-500 w-10 h-10 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Items Purchased
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {userData?.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Mixed Chart (Bar + Line) */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Revenue & Sales by Category
        </h3>
        <div className="h-[400px]">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
