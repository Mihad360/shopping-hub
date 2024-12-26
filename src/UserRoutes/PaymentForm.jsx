import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../redux/baseapi/baseApi";
import moment from "moment/moment";

const PaymentForm = () => {
  const { name, email } = useSelector((state) => state.userSlice.user);
  const { data: cartData = [] } = useGetCartQuery(email);

  const totalPrice = cartData.reduce((total, item) => total + item.price, 0);
  const presentDate = moment().format("MMM Do YYYY h:mm:ss a");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const checkoutInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      totalPrice: totalPrice,
      date: data.checkoutDate,
      phone: data.phone
    };
    console.log(checkoutInfo);
    axios
      .post("http://localhost:5000/create-checkout", {
        checkoutInfo,
      })
      .then((res) => {
        const redirectUrl = res.data.paymentURL;
        if (redirectUrl) {
          window.location.replace(redirectUrl);
        }
      });
  };

  return (
    <div className="mt-10 bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-green-600 text-center">
        Checkout Details
      </h2>
      <p className="text-red-500 pb-5 font-medium">Note: You can replace the default values by your own information</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              defaultValue={name}
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="Your Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              defaultValue={email}
              readOnly
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className={`w-full px-4 py-3 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="+880XXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`w-full px-4 py-3 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="123 Main St, City, Country"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Checkout Date Field */}
          <div>
            <label
              htmlFor="checkoutDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Checkout Date
            </label>
            <input
              defaultValue={presentDate}
              type="text"
              readOnly
              id="checkoutDate"
              {...register("checkoutDate", {
                required: "Checkout date is required",
              })}
              className={`w-full px-4 py-3 border ${
                errors.checkoutDate ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.checkoutDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.checkoutDate.message}
              </p>
            )}
          </div>

          {/* Total Price Field */}
          <div>
            <label
              htmlFor="totalPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Total Price (TK)
            </label>
            <input
              type="number"
              id="totalPrice"
              {...register("totalPrice")}
              value={totalPrice}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
        disabled={cartData?.length === 0}
          type="submit"
          className="w-full mt-6 bg-green-600 text-white py-3 px-5 rounded-md text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Confirm Checkout
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
