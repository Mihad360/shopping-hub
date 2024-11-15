import { useQuery } from "@tanstack/react-query";
import useaxiosSecure from "./useaxiosSecure";

const useUsers = () => {

    const axiosSecure = useaxiosSecure()
    const {data: users = [], refetch, isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    return [users, refetch, isLoading]
};

export default useUsers;