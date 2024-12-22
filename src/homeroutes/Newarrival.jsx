import Marquee from "react-fast-marquee";
import { useGetNewArrivalQuery } from "../redux/baseapi/baseApi";
import { Link } from "react-router-dom";

const Newarrival = () => {
  const { data, isLoading, error } = useGetNewArrivalQuery();
  

  if (isLoading) {
    return <p>Loading new arrivals...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <div className="pt-12 container mx-auto">
      <h2 className="text-2xl font-bold text-center pb-12">New Arrivals</h2>
      <Marquee gradient={false} speed={100} pauseOnHover className="space-x-5">
        <div className="flex gap-5">
          {data?.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center bg-green-300 shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-5">
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-60 h-60 object-cover rounded-lg mb-2"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {product.title}
                </h3>
                {/* <p className="text-lg text-black text-center">
                  <span className="">{product.price.toFixed(2)}</span> TK
                </p> */}
                {product.discount > 0 && (
                  <p className="text-lg pt-3 text-center text-red-600 font-semibold">
                    {product.discount}% Off
                  </p>
                )}
                <div className="flex items-center gap-4 justify-center pt-3">
                  <p className="line-through text-red-500">{product.price} TK</p>
                  <p>➜</p>
                  {
                  product.discount && <p className="text-lg font-medium text-black">{product.price * (1 - product.discount / 100)} TK</p>
                }
                </div>
                <p className="text-base pt-2 text-center">Coming on <span className="text-black font-semibold">({product.date})</span></p>
                
              </div>
              </div>
              <Link to='/shop' className="btn btn-sm bg-slate-600 border border-slate-600 hover:bg-slate-500 hover:border-slate-600 text-lg mb-2 mt-2 text-white">View In Shop</Link>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Newarrival;
