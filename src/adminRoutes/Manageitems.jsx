import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetShopQuery } from "../redux/baseapi/baseApi";

const Manageitems = () => {
  const { data: items, isLoading } = useGetShopQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (isLoading) {
    return <p className="text-3xl text-center pt-32">Loading.....</p>;
  }

  // Filter items by selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items?.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold text-green-600 pt-20">
          All Carts
        </h1>
        <div className="bg-gray-200 rounded-lg p-5 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-black">
              Total Items: {filteredItems?.length}
            </h1>
            <div>
              <label
                htmlFor="categoryFilter"
                className="mr-2 font-medium text-black"
              >
                Filter by categories:
              </label>
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="All">All</option>
                <option value="three pis">Three pis</option>
                <option value="shirt">Shirt</option>
                <option value="pants">Pants</option>
                <option value="shoes">Shoes</option>
                <option value="saree">Saree</option>
                <option value="t-shirt">T-Shirt</option>
              </select>
            </div>
          </div>

          <div className="pt-5">
            {filteredItems?.length === 0 ? (
              <p className="text-black text-2xl font-semibold text-center py-6">
                No Items available
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* Head */}
                  <thead>
                    <tr className="text-base">
                      <th>Sl no.</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Action</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems?.map((item, index) => (
                      <tr key={item._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-24 w-24">
                                <img
                                  src={item.image}
                                  alt="Item"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-lg font-bold">{item.title}</td>
                        <td className="text-base font-bold text-amber-600">
                          {item.price} TK
                        </td>
                        <th>
                          <button
                            className="btn bg-green-600 hover:bg-green-400 btn-sm text-white text-base mr-3"
                          >
                            Edit
                          </button>
                        </th>
                        <th>
                          <button
                            className="btn bg-red-600 hover:bg-red-400 btn-sm text-white text-base mr-3"
                          >
                            Delete
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageitems;
