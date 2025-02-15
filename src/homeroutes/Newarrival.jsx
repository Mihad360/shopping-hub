import Marquee from "react-fast-marquee";
import { useGetNewArrivalQuery } from "../redux/baseapi/baseApi";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const NewArrivals = () => {
  const { data, isLoading, error } = useGetNewArrivalQuery();

  if (isLoading) {
    return (
      <div className="mx-auto w-32 py-72">
        <Loading></Loading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        <p className="text-xl font-semibold">Oops! Something went wrong.</p>
        <p className="mt-2">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          New Arrivals
        </h2>
        <Marquee gradient={false} speed={50} pauseOnHover className="py-4 space-x-8">
          <div className="flex gap-8">
            {data?.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden w-72 transform transition duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                  <Link
                    to="/shop"
                    className="absolute bottom-0 left-0 right-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 transition duration-300 ease-in-out flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    View in Shop
                  </Link>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2 truncate">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      {product.discount > 0 && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                          {product.discount}% OFF
                        </span>
                      )}
                      <span className="text-lg font-bold text-green-700">
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}{" "}
                        TK
                      </span>
                    </div>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.price.toFixed(2)} TK
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Coming on {product.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default NewArrivals;
