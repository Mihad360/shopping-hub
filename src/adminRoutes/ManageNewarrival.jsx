import { Link } from "react-router-dom";
import { useGetNewArrivalQuery, useUpdateStatusMutation } from "../redux/baseapi/baseApi";

const ManageNewarrival = () => {

    const {data: newArrival, isLoading} = useGetNewArrivalQuery()
    const [updateNewarrival, {data}] = useUpdateStatusMutation()

    const handleUpdateStatus = async (item) => {
        console.log(item);
        let updateStatus;
        if(item.status === "pending"){
            updateStatus = "in stock"
        }else{
            updateStatus = "out of stock"
        }
        const res = await updateNewarrival({id: item._id, data: {status: updateStatus}})
        console.log(res);
    }

    if(isLoading){
        return <p className="pt-32">Loading........</p>
    }

    return (
        <div>
      <div>
        <h1 className="text-center text-3xl font-bold text-green-600 pt-20">
          New Arrival Items
        </h1>
        <div className="bg-gray-200 rounded-lg p-5 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-black">
              Total Items: {newArrival?.length}
            </h1>
          </div>

          <div className="pt-5">
            {newArrival?.length === 0 ? (
              <p className="text-black text-2xl font-semibold text-center py-6">
                No Items available
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* Head */}
                  <thead>
                    <tr className="text-base">
                      <th>Sl no.</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Discount</th>
                      <th>Discounted Price</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newArrival?.map((item, index) => (
                      <tr key={item._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-24 w-24">
                                <img
                                  src={item.image}
                                  alt="Item"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-lg font-bold">{item.title}</td>
                        <td className="text-green-600 font-bold text-lg">{item.discount}%</td>
                        <td className="text-base font-bold text-amber-600">
                        <span className="line-through pr-2 text-red-600">{item.price}TK</span> {item.price * (1 - item.discount / 100)} TK
                        </td>
                        <td>{item.status}</td>
                        <th>
                          <button
                          onClick={() => handleUpdateStatus(item)}
                            className="btn bg-green-600 hover:bg-green-400 btn-sm text-white text-base mr-3"
                          >
                            {
                                item.status === "pending" ? 'Make In stock' : 'Make Out of stock'
                            }
                          </button>
                        </th>
                        <th>
                          <button
                          onClick={()=>handledelete(item._id)}
                            className="btn bg-red-600 hover:bg-red-400 btn-sm text-white text-base mr-3"
                          >
                            Remove
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
};

export default ManageNewarrival;