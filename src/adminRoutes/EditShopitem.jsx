import { useParams } from "react-router-dom";
import {
  useGetShopItemQuery,
  useUpdateShopItemMutation,
} from "../redux/baseapi/baseApi";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const EditShopitem = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetShopItemQuery(id);
  const [updateItem] = useUpdateShopItemMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const item = {
      title: data?.title,
      image: data?.image,
      category: data?.category,
      description: data?.description,
      discount: parseFloat(data?.discount) || "",
      price: parseFloat(data?.price),
      stock: parseFloat(data?.stock) || "",
    };
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to update this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await updateItem({id, ...item});
          if (res.data.modifiedCount > 0) {
            toast("✔️ The item is updated", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }
        }
      });
    } catch (error) {
      if (error) {
        toast("Failed to update the item, Something is wrong!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  if (isLoading) {
    return <p className="pt-28">Loading......</p>;
  }

  return (
    <div className="pt-24">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl border-t-4 border-green-500"
        >
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Edit Item
          </h2>

          <div className="flex flex-wrap -mx-4">
            {/* Title Input */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                defaultValue={data?.title}
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Image Link Input */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="image"
              >
                Image Link
              </label>
              <input
                defaultValue={data?.image}
                id="image"
                type="url"
                {...register("image", { required: "Image link is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value={data?.category}>{data?.category}</option>
                <option value="three-pis">three pis</option>
                <option value="shirt">shirt</option>
                <option value="pants">pants</option>
                <option value="shoes">shoes</option>
                <option value="saree">saree</option>
                <option value="t-shirt">t-shirt</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price Input */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                defaultValue={data?.price}
                id="price"
                type="number"
                {...register("price", { required: "Price is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Discount Input */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="discount"
              >
                Discount (%)
              </label>
              <input
                defaultValue={data?.discount}
                id="discount"
                type="number"
                {...register("discount", { required: "Discount is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discount.message}
                </p>
              )}
            </div>

            {/* Stock Input */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                defaultValue={data?.stock}
                id="stock"
                type="number"
                {...register("stock", { required: "Stock is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* Description Textarea */}
            <div className="w-full px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                defaultValue={data?.description}
                id="description"
                rows="4"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-500 font-semibold transition duration-300 text-xl"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShopitem;
