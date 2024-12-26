import { useSelector } from "react-redux";
import { useGetPaymentListQuery } from "../redux/baseapi/baseApi";
import Loading from "../components/Loading";

const PaymentHistory = () => {
  const { email } = useSelector((state) => state.userSlice.user);
  const { data, isLoading, isError } = useGetPaymentListQuery(email);

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading payment history. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Payment History
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-black font-semibold uppercase">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-black font-semibold uppercase">
                Checkout Date
              </th>
              <th className="px-6 py-4 text-black font-semibold uppercase">Name</th>
              <th className="px-6 py-4 text-black font-semibold uppercase">Email</th>
              <th className="px-6 py-4 text-black font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-black font-semibold uppercase">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              [...data].reverse().map((payment, index) => (
                <tr
                  key={index}
                  className="bg-white border-b transition duration-300 hover:bg-gray-100"
                >
                  <td className="px-6 py-4">{payment.trans_id}</td>
                  <td className="px-6 py-4">{payment.checkout_date}</td>
                  <td className="px-6 py-4">{payment.cus_name}</td>
                  <td className="px-6 py-4">{payment.cus_email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight text-${
                        payment.status === "success" ? "green" : "orange"
                      }-600`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 bg-${
                          payment.status === "success" ? "green" : "orange"
                        }-200 rounded-full opacity-50`}
                      ></span>
                      <span className="relative">{payment.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {payment.checkout_bill.toFixed(2)} TK
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
