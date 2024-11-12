import { useSelector } from "react-redux";
import { useDeleteCartMutation, useGetCartQuery } from "../redux/baseapi/baseApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { email } = useSelector((state) => state.userSlice.user);
  const { data } = useGetCartQuery(email);
  const [deleteCart] = useDeleteCartMutation()
  const totalPrice = data?.reduce(
    (total, nextPrice) => total + nextPrice.price,
    0
  );

  const handledelete = async (id) => {
    const res = await deleteCart(id)
    if(res?.data?.deletedCount > 0){
      Swal.fire({
        position: "top-left",
        icon: "success",
        title: `This Cart has been removed`, 
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  return (
    <div className="">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-black">
            Carts: {data?.length}
          </h1>
          <p className="text-xl font-medium text-black">
            Total Price: <span className="text-amber-600">{totalPrice}</span> TK
          </p>
          {data?.length ? (
            <Link to="/dashboard/payment">
              <button className="bg-green-600 btn btn-md w-16 text-xl px-2 text-white hover:bg-green-400">
                Pay
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="bg-green-600 btn btn-md w-16 text-xl px-2 text-white hover:bg-green-400"
            >
              Pay
            </button>
          )}
        </div>
        <div className="">
          <div className="pt-5">
            {data?.length === 0 ? (
              <p className="text-black text-2xl font-semibold text-center py-6">
                No carts added
              </p>
            ) : (
              <div className="">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr className="text-base">
                      <th>Sl no.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {data?.map((item, index) => (
                      <tr key={item._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-24 w-24">
                                <img
                                  className=""
                                  src={item.image}
                                  alt="Avatar Tailwind CSS Component"
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
                            onClick={() => handledelete(item._id)}
                            className="btn bg-red-600 hover:bg-red-400 btn-sm mx-auto text-white text-base mr-3"
                          >
                            delete
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

export default Cart;
