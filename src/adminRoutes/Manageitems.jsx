import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteShopItemMutation, useGetShopQuery } from "../redux/baseapi/baseApi";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const Manageitems = () => {
  const { data: items, isLoading } = useGetShopQuery();
  const [deleteItem] = useDeleteShopItemMutation()
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items?.filter((item) => item.category === selectedCategory);

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Remove!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await deleteItem(id)
        if(res?.data?.deletedCount > 0){
          toast('✔️ The Item is Removed', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    });
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl font-bold text-green-600 mb-8">
        Manage Items
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-green-50 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-green-800">
            Total Items: <span className="text-green-600">{filteredItems?.length}</span>
          </h2>
          <div className="flex items-center">
            <label htmlFor="categoryFilter" className="mr-2 font-medium text-green-700">
              Filter by category:
            </label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

        {filteredItems?.length === 0 ? (
          <p className="text-green-800 text-2xl font-semibold text-center py-10">
            No Items available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Sl no.</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {[...filteredItems]?.reverse().map((item, index) => (
                  <tr key={item._id} className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-green-200">
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-green-800">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-amber-600">
                      {item.price} TK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/dashboard/manageitems/edititems/${item._id}`}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handledelete(item._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
                      >
                        Remove
                      </button>
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

export default Manageitems;
