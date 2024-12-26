import { useSelector } from "react-redux";
import { useGetCartQuery } from "../redux/baseapi/baseApi";
import Loading from "../components/Loading";

const PaymentCarts = () => {
  const { email } = useSelector((state) => state.userSlice.user);
  const { data: carts = [] , isLoading} = useGetCartQuery(email);

  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="px-4 py-8">
      <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold">
          Total Price: {totalPrice.toFixed(2)} TK
        </h2>
      </div>

      {carts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b text-sm">{index + 1}</td>
                  <td className="px-6 py-4 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-800">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-green-600 font-bold">
                    {item.price.toFixed(2)} TK
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          <p>The Paying carts are empty</p>
        </div>
      )}
    </div>
  );
};

export default PaymentCarts;
