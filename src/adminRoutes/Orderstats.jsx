import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useGetAdminstatsQuery } from "../redux/baseapi/baseApi";

const Orderstats = () => {
  const { data: adminStats = [] } = useGetAdminstatsQuery();

  const { users, shopItems, orders, revenue } = adminStats;

  const chartData = [
    { name: "Users", value: users },
    { name: "Shop Items", value: shopItems },
    { name: "Orders", value: orders },
    { name: "Revenue", value: revenue },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


  return (
    <div className="flex gap-6">
      <div>
        <BarChart
          width={400}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis /> {/* Adjust Y-Axis */}
          <Tooltip />
          <Legend />
          {/* Individual Bars for each data item */}
          <Bar
            label={{ position: "top" }}
            dataKey="value"
            name="Users"
            data={[{ name: "Users", value: users }]}
            fill="#ff582e"
          />
        </BarChart>
        <BarChart
          width={400}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis /> {/* Adjust Y-Axis */}
          <Tooltip />
          <Legend />
          {/* Individual Bars for each data item */}
          <Bar
            shape={TriangleBar}
            label={{ position: "top" }}
            dataKey="value"
            name="Revenue"
            data={[{ name: "Revenue", value: revenue }]}
            fill="#f646cd"
          />
        </BarChart>
      </div>
      <div>
        <BarChart
          width={400}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis /> {/* Adjust Y-Axis */}
          <Tooltip />
          <Legend />
          {/* Individual Bars for each data item */}
          <Bar
            shape={TriangleBar}
            label={{ position: "top" }}
            dataKey="value"
            name="Shop Items"
            data={[{ name: "Shop Items", value: shopItems }]}
            fill="#ed9b2c"
          />
        </BarChart>
        <BarChart
          width={400}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis /> {/* Adjust Y-Axis */}
          <Tooltip />
          <Legend />
          {/* Individual Bars for each data item */}
          <Bar
            label={{ position: "top" }}
            dataKey="value"
            name="Orders"
            data={[{ name: "Orders", value: orders }]}
            fill="#2c69ed"
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Orderstats;
