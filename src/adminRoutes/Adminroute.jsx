import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useGetIsAdminQuery } from "../redux/baseapi/baseApi";

const Adminroute = ({children}) => {

    const {email, isLoading} = useSelector(state => state.userSlice.user)
    const {data: isAdmin, isLoading: loading} = useGetIsAdminQuery(email)
    const location = useLocation()
    // console.log(email, isAdmin);

    if(isLoading || loading){
        return <p className="pt-32">Loading......</p>
    }

    if(email && isAdmin?.admin){
        return children
    }

    return <Navigate to="/"  state={{from: location}}></Navigate>
};

export default Adminroute;