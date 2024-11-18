import { useForm } from "react-hook-form";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="pt-28">
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
                className="block text-green-700 font-medium mb-2"
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
                className="block text-green-700 font-medium mb-2"
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
              {errors.imageLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.imageLink.message}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label
                className="block text-green-700 font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                defaultValue=''
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
                className="block text-green-700 font-medium mb-2"
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

            {/* Description Input */}
            <div className="w-full px-4 mb-4">
              <label
                className="block text-green-700 font-medium mb-2"
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
