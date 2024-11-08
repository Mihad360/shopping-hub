import { useState, useEffect } from "react";
import { useGetShopQuery } from "../redux/baseapi/baseApi";
import Shopcard from "./Shopcard";

const Shop = () => {
  // Retrieve the initial filter value from localStorage or default to "All"
  const [shopData, setShopData] = useState(localStorage.getItem("shopFilter") || "All");
  const { data: shop, isError, isLoading, error } = useGetShopQuery();

  // Save the filter value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopFilter", shopData);
  }, [shopData]);

  const filterShop =
    shopData === "All"
      ? shop
      : shop?.filter((item) => item.category.includes(shopData));
  
  return (
    <div className="pt-24 max-w-[1400px] mx-auto">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-green-600">
            Shop Items
          </h1>
          <p className="text-lg text-black flex items-center gap-3">
            Filter Items ➜
            {['All', "shirt", "pants", "saree", "three pis", "t-shirt", "shoes",].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setShopData(cat)}
                  className={`${
                    shopData === cat
                      ? "bg-green-600 btn btn-sm px-2 text-black hover:bg-green-400"
                      : "bg-green-600 btn btn-sm px-2 text-white hover:bg-green-400"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </p>
        </div>
        <div className="flex justify-center pt-16">
          <div className="grid grid-cols-4 gap-5">
            {filterShop?.length > 0 ? filterShop?.map((item) => (
              <Shopcard key={item._id} item={item} />
            )) : <p className="text-xl text-red-600 font-semibold py-12">This category has no items</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
