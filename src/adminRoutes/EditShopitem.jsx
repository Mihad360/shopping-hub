/* eslint-disable react/no-unescaped-entities */
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
      discount: parseFloat(data?.discount) || 0,
      price: parseFloat(data?.price),
      stock: parseFloat(data?.stock) || 0,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateItem({ id, ...item });
          if (res.data.modifiedCount > 0) {
            toast("✔️ The item has been updated successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        } catch (error) {
          toast("Failed to update the item. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg pb-8 rounded-lg max-w-5xl mx-auto"
      >
        <div className="bg-green-600 rounded-t-lg text-white py-4 px-6">
          <h2 className="text-3xl font-bold text-center">Edit "{data.title}"</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              defaultValue={data?.title}
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="image"
            >
              Image Link
            </label>
            <input
              id="image"
              type="url"
              defaultValue={data?.image}
              {...register("image", { required: "Image link is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              defaultValue={data?.category}
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="three-pis">Three Piece</option>
              <option value="shirt">Shirt</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
              <option value="saree">Saree</option>
              <option value="t-shirt">T-Shirt</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              defaultValue={data?.price}
              {...register("price", { required: "Price is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="discount"
            >
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              defaultValue={data?.discount}
              {...register("discount")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              defaultValue={data?.stock}
              {...register("stock")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              defaultValue={data?.description}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 text-lg font-semibold"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShopitem;
