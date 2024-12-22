import { useSelector } from "react-redux";
import {
  useDeleteCartMutation,
  useGetCartQuery,
} from "../redux/baseapi/baseApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

const Cart = () => {
  const { email } = useSelector((state) => state.userSlice.user);
  const { data, isLoading } = useGetCartQuery(email);
  const [deleteCart] = useDeleteCartMutation();
  const totalPrice = data?.reduce(
    (total, nextPrice) => total + nextPrice.price,
    0
  );

  const handledelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCart(id);
        if (res?.data?.deletedCount > 0) {
          toast("✔️ Item removed from cart", {
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
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl font-bold text-green-600 mb-8">
        Your Cart
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-green-50 flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-xl font-semibold text-green-800 mb-4 sm:mb-0">
            Items in Cart:{" "}
            <span className="text-green-600">{data?.length}</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xl font-semibold text-green-800">
              Total Price:{" "}
              <span className="text-amber-600">{totalPrice} TK</span>
            </p>
            {data?.length ? (
              <Link to="/dashboard/payment">
                <button className="bg-green-600 px-6 py-2 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300">
                  Pay
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="bg-green-300 px-6 py-2 text-white text-lg font-semibold rounded-md cursor-not-allowed"
              >
                Pay
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          {data?.length === 0 ? (
            <p className="text-green-800 text-2xl font-semibold text-center py-10">
              Your cart is empty
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      No.
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  {data?.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-green-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-green-200">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-green-800">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-amber-600">
                        {item.price} TK
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handledelete(item._id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors duration-300"
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
    </div>
  );
};

export default Cart;
