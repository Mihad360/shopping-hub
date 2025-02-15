import { useGetOrderstatsQuery } from "../redux/baseapi/baseApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Fence, Footprints, Shirt } from "lucide-react";
import { GiArmoredPants, GiExplosiveMaterials } from "react-icons/gi";
import { PiTShirtFill } from "react-icons/pi";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Orderstats = () => {
  const { data: orderStats = [] } = useGetOrderstatsQuery();
  console.log(orderStats);

  const labels = orderStats?.map((order) => order.category);
  const quantities = orderStats?.map((order) => order.quantity);
  const revenues = orderStats?.map((order) => order.revenue);

  return (
    <div>
      <div className="gap-5 px-5">
        <div>
          <div className="grid grid-cols-3 gap-4">
            {orderStats?.map((item) => (
              <div
                key={item.category}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex items-center gap-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                  {item.category === "shoes" ? (
                    <p>
                      <Footprints className="w-8 h-8 text-red-500 dark:text-red-300" />
                    </p>
                  ) : item.category === "shirt" ? (
                    <p>
                      <Shirt className="w-8 h-8 text-green-500 dark:text-green-300" />
                    </p>
                  ) : item.category === "saree" ? (
                    <p>
                      <Fence className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />
                    </p>
                  ) : item.category === "pants" ? (
                    <p>
                      <GiArmoredPants className="w-8 h-8 text-purple-500 dark:text-purple-300" />
                    </p>
                  ) : item.category === "t-shirt" ? (
                    <p>
                      <PiTShirtFill className="w-8 h-8 text-orange-500 dark:text-orange-300" />
                    </p>
                  ) : item.category === "three-pis" ? (
                    <p>
                      <GiExplosiveMaterials className="w-8 h-8 text-pink-500 dark:text-pink-300" />
                    </p>
                  ) : null}
                </div>

                <div>
                  <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
                    {item.category}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Revenue:{" "}
                    <span className="text-black font-semibold">
                      {item.revenue} TK
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-4 flex-1 mt-5">
          <Bar
            className=""
            data={{
              labels,
              datasets: [
                {
                  label: "Quantity",
                  data: quantities,
                  backgroundColor: "rgba(70, 255, 177 )", // Blue
                  borderRadius: 5,
                  stack: "Stack 0",
                },
                {
                  label: "Revenue",
                  data: revenues,
                  backgroundColor: "rgba(70, 255, 177 )", // Yellow
                  borderRadius: 5,
                  stack: "Stack 0",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Order Statistics" },
              },
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Orderstats;
