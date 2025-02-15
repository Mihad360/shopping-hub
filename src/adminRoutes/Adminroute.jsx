import { Navigate, useLocation } from "react-router-dom";
import { useGetIsAdminQuery } from "../redux/baseapi/baseApi";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const Adminroute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading } = useGetIsAdminQuery(user?.email);
  const location = useLocation();
  console.log(user?.email, isAdmin);

  if (isLoading || loading) {
    return (
      <div className="text-center py-72">
        <Loading></Loading>
      </div>
    );
  }

  if (user?.email && isAdmin?.admin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }}></Navigate>;
};

export default Adminroute;
