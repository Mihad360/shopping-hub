import { useForm } from "react-hook-form";
import { useAddItemMutation } from "../redux/baseapi/baseApi";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

const AddItem = () => {
  const [addItem] = useAddItemMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const shop = {
      id: uuidv4(),
      title: data.title,
      image: data.image,
      category: data.category,
      description: data.description,
      discount: parseFloat(data.discount),
      price: parseFloat(data.price),
      stock: parseFloat(data.stock),
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Add!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await addItem(shop);
        if (res?.data?.insertedId) {
          toast("✔️ The Item was added successfully", {
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
          reset();
        }
      }
    });
  };

  return (
    <div className="px-4 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg pb-8 shadow-lg max-w-5xl mx-auto"
      >
        <div className="bg-green-600 rounded-t-lg text-white py-4 px-6">
          <h2 className="text-3xl font-bold text-center">Add New Item</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter item title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="image"
            >
              Image Link
            </label>
            <input
              id="image"
              type="url"
              {...register("image", { required: "Image link is required" })}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter image URL"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option value="three-pis">Three Piece</option>
              <option value="shirt">Shirt</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
              <option value="saree">Saree</option>
              <option value="t-shirt">T-Shirt</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="discount"
            >
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              {...register("discount", {
                required: "Discount is required",
                min: { value: 0, message: "Discount cannot be negative" },
                max: { value: 100, message: "Discount cannot exceed 100%" },
              })}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter discount percentage"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter stock quantity"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label
              className="block text-green-700 font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Enter item description"
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 text-lg font-semibold"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
