import { RiAdminFill } from "react-icons/ri";
import { useGetUsersQuery, useUpdateAdminMutation } from "../redux/baseapi/baseApi";
import Swal from "sweetalert2";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allusers = () => {

    const {data: users, isLoading} = useGetUsersQuery()
    const [updateAdmin, {data}] = useUpdateAdminMutation()
    // const [users, refetch, isLoading] = useUsers()
    // const axiosSecure = useAxiosSecure()

    const makeAdmin = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to make this user to Admin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const res = await updateAdmin(id)
          // const res = await axiosSecure.patch(`/users/admin/${id}`)
          console.log(res);
          if(res.data.modifiedCount > 0){
            toast('✔️ The user is now an Admin', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              });
              // refetch()
          }
        }
      });
    }

    if(isLoading){
        return <p>Loading....</p>
    }

    return (
        <div>
        <h1 className="text-center text-3xl font-bold text-green-600 pt-20">
          All Users
        </h1>
        <div className="bg-gray-200 rounded-lg p-5 mt-6">
          <div className="flex items-center justify-between pb-5">
            <h1 className="text-2xl font-semibold text-black">
              Total Users: {users?.length}
            </h1>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-base">
                    <th>Sl no.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {users?.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td className="text-lg font-bold">{item.name}</td>
                      <td className="text-base font-bold text-green-600">
                        {item.email}
                      </td>
                      <th>
                        {
                            item.role === "admin" ? <button className="btn bg-green-600 hover:bg-green-400 btn-sm mx-auto text-black text-base mr-3">
                            <RiAdminFill /> Admin
                          </button> : <button onClick={()=>makeAdmin(item._id)} className="btn bg-green-600 hover:bg-green-400 btn-sm mx-auto text-black text-lg mr-3">
                          <RiAdminFill /> <span>Make Admin</span>
                        </button>
                        }
                      </th>
                      <th>
                        <button
                          onClick={() => handledelete(item._id)}
                          className="btn bg-red-600 hover:bg-red-400 btn-sm mx-auto text-white text-base mr-3"
                        >
                          delete user
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Allusers;