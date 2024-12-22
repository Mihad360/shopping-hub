import {
  useGetNewArrivalQuery,
  useUpdateStatusMutation,
} from "../redux/baseapi/baseApi";
import Loading from "../components/Loading";

const ManageNewarrival = () => {
  const { data: newArrival, isLoading } = useGetNewArrivalQuery();
  const [updateNewarrival] = useUpdateStatusMutation();

  const handleUpdateStatus = async (item) => {
    let updateStatus = item.status === "pending" ? "in stock" : "out of stock";
    const res = await updateNewarrival({
      id: item._id,
      data: { status: updateStatus },
    });
    console.log(res);
  };

  const handledelete = async (id) => {
    console.log(id);
  };

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-3xl font-bold text-green-600 mb-8">
        New Arrival Items
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-green-50">
          <h2 className="text-2xl font-semibold text-green-800">
            Total Items:{" "}
            <span className="text-green-600">{newArrival?.length}</span>
          </h2>
        </div>

        {newArrival?.length === 0 ? (
          <p className="text-green-800 text-2xl font-semibold text-center py-10">
            No Items available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table auto w-full">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Sl no.
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Image
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Discounted Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {newArrival?.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-green-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-green-200">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-800">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap font-bold text-green-600">
                      {item.discount}%
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap font-bold">
                      <span className="line-through pr-2 text-red-600">
                        {item.price} TK
                      </span>
                      <span className="text-amber-600">
                        {(item.price * (1 - item.discount / 100)).toFixed(2)} TK
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "in stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="px-4 py-2 whitespace-nowrap flex items-center justify-between">
                        <button
                          onClick={() => handleUpdateStatus(item)}
                          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors duration-300"
                        >
                          {item.status === "pending"
                            ? "Make In stock"
                            : "Make Out of stock"}
                        </button>
                        <button
                          onClick={() => handledelete(item._id)}
                          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNewarrival;
