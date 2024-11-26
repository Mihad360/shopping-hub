import { useForm } from "react-hook-form";
import { useAddNewArrivalMutation } from "../redux/baseapi/baseApi";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const AddNewArrival = () => {
  const [addnewarrival, { data }] = useAddNewArrivalMutation();
  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newitem = {
      title: data.title,
      image: data.image,
      category: data.category,
      discount: parseFloat(data.discount),
      price: parseFloat(data.price),
      stock: parseFloat(data.stock),
      date: data.date,
      status: data.status
    };
    console.log(data, newitem);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this new item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await addnewarrival(newitem);
        if (res?.data?.insertedId) {
          toast("✔️ The Item was added", {
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
    <div className="pt-28">
      <div className="max-w-5xl mx-auto p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-green-500">
          Add New Arrival
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Flex Container */}
          <div className="flex flex-wrap gap-6">
            {/* Title */}
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter item title"
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Arrival Date</label>
              <input
                type="date"
                {...register("date", {
                  required: "Date is required",
                  min: { value: 0, message: "Something is wrong" },
                })}
                placeholder="Enter item arrival date"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Flex Container */}
          <div className="flex flex-wrap gap-6">
            {/* Category */}
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Category</label>
              <select
                defaultValue=""
                {...register("category", { required: "Category is required" })}
                className="select select-bordered w-full"
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

            {/* Discount */}
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Discount (%)</label>
              <input
                type="number"
                {...register("discount", {
                  required: "Discount is required",
                  min: { value: 0, message: "Discount cannot be negative" },
                })}
                placeholder="Enter discount percentage"
                className="input input-bordered w-full"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>

          {/* Flex Container */}
          <div className="flex flex-wrap gap-6">
            {/* Stock */}
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Stock</label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                placeholder="Enter stock quantity"
                className="input input-bordered w-full"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Price ($)</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
                placeholder="Enter item price"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Image URL</label>
              <input
                type="url"
                {...register("image", { required: "Image URL is required" })}
                placeholder="Enter image URL"
                className="input input-bordered w-full"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[300px]">
              <label className="block font-medium mb-1">Status</label>
              <select
              defaultValue=""
                {...register("status", { required: "status is required" })}
                className="select select-bordered w-full"
              >
                <option value="pending">pending</option>
                <option value="in stock">in stock</option>
                <option value="out of stock">out of stock</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-500 text-white px-8 py-2 rounded-md text-lg"
            >
              Add New Arrival Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewArrival;
