import { useForm } from "react-hook-form";
import { useAddItemMutation } from "../redux/baseapi/baseApi";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const AddItem = () => {

  const [addItem, {data}] = useAddItemMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const shop = {
      title: data.title,
      image: data.image,
      category: data.category,
      description: data.description,
      discount: parseFloat(data.discount),
      price: parseFloat(data.price),
      stock: parseFloat(data.stock),
    }
    // console.log(shop);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add those item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await addItem(shop)
        if(res?.data?.insertedId){
          toast('✔️ The Item is added', {
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
  };

  return (
    <div className="pt-24">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl border-t-4 border-green-500"
        >
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Add New Item
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
                placeholder="Title"
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
                placeholder="Image URL"
                id="image"
                type="url"
                {...register("image", {
                  required: "Image link is required",
                })}
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
                defaultValue=""
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="" disabled>
                  Select Category
                </option>
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
                placeholder="Price"
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
                placeholder="Discount"
                id="discount"
                type="number"
                {...register("discount", {
                  required: "Discount is required",
                  min: {
                    value: 0,
                    message: "Discount cannot be negative",
                  },
                  max: {
                    value: 100,
                    message: "Discount cannot exceed 100%",
                  },
                })}
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
                placeholder="Stock Quantity"
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

            {/* Description Input */}
            <div className="w-full px-4 mb-4">
              <label
                className="block text-green-600 font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                placeholder="Description"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-500 font-semibold transition duration-300 text-xl"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
