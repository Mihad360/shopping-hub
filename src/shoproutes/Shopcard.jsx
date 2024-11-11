import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddCartMutation } from "../redux/baseapi/baseApi";

const Shopcard = ({ item }) => {
  const { title, description, price, category, image } = item;
  const navigate = useNavigate()
  const [addCart, {data, isLoading: loading}] = useAddCartMutation()
  const { email, isLoading } = useSelector((state) => state.userSlice.user);
  console.log(email, isLoading);

  if(loading){
    return <p>Loading.....</p>
  }

  const addToCart =async () => {
    if(email && !isLoading){
      const cartInfo = {
        email: email,
        title, image, description, price, category,
      }
      const res = await addCart(cartInfo)
      if(res?.data?.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `added to the cart`, 
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    else{
      Swal.fire({
        title: "You are not logged in!!",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signin')
        }
      });
    }
  };

  return (
    <div>
      <div className="card border border-gray-300 p-5">
        <figure className="bg-gray-200  rounded-b-xl h-80">
          <img
            src={image}
            alt="image"
            className="rounded-xl h-full w-full object-cover"
          />
        </figure>
        <div className="">
          <h2 className="text-xl font-semibold py-2">{title}</h2>
          <p className="text-base text-black pb-2">{description}</p>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">
              Price:{" "}
              <span className="text-amber-600 font-semibold">{price}</span> TK
            </h1>
            <button
              onClick={addToCart}
              className="btn bg-green-600 hover:bg-green-400 text-black text-base"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopcard;
