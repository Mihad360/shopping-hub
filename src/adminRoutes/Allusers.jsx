import { RiAdminFill } from "react-icons/ri";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateAdminMutation,
} from "../redux/baseapi/baseApi";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

const Allusers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteUser] = useDeleteUserMutation();

  const makeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Make Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateAdmin(id);
        if (res.data.modifiedCount > 0) {
          toast("✔️ The user is now an Admin", {
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(id);
        if (res?.data?.deletedCount > 0) {
          toast("✔️ The user is removed", {
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

  // if (isLoading) {
  //   return (
  //     <Loading></Loading>
  //   );
  // }

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl font-bold text-green-600 mb-8">
        All Users
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-green-50">
          <h2 className="text-2xl font-semibold text-green-800">
            Total Users: <span className="text-green-600">{users?.length}</span>
          </h2>
        </div>
        <div className="overflow-y-auto">
          <table className="w-full">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Sl no.
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              {users?.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.role === "admin" ? (
                      <span className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <RiAdminFill className="mr-1" /> Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => makeAdmin(item._id)}
                        className="px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors duration-200"
                      >
                        <RiAdminFill className="mr-1" /> Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-200"
                    >
                      Remove user
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
