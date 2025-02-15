import { useContext } from "react";
import { AuthContext } from "../authentication/Authprovider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;