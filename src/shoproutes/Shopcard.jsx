import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddCartMutation } from "../redux/baseapi/baseApi";

const Shopcard = ({ item }) => {
  const { title, description, price, category, image, discount } = item;
  const navigate = useNavigate();
  const [addCart, { isLoading: loading }] = useAddCartMutation();
  const { email, isLoading } = useSelector((state) => state.userSlice.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const addToCart = async () => {
    if (email && !isLoading) {
      const cartInfo = {
        email: email,
        title,
        image,
        description,
        price,
        category,
        discount,
      };
      const res = await addCart(cartInfo);
      if (res?.data?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Added to the cart`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "You are not logged in!",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin");
        }
      });
    }
  };

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="group">
      <div className="card bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
        <figure className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {discount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md">
              {discount}% OFF
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={addToCart}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            >
              Add to Cart
            </button>
          </div>
        </figure>
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              {discount > 0 ? (
                <div>
                  <span className="text-lg font-bold text-green-600">
                    {discountedPrice.toFixed(2)} TK
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {price.toFixed(2)} TK
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-green-600">
                  {price.toFixed(2)} TK
                </span>
              )}
            </div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopcard;
