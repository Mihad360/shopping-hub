import axios from "axios";
import { useSelector } from "react-redux";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {

    const {token} = useSelector(state => state.userSlice.token)
    console.log(token);

    axiosSecure.interceptors.request.use(
        (config) => {
        //   const token = localStorage.getItem("access-token");
          console.log("request stopped by interceptors", token);
          config.headers.authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

  return axiosSecure;
};

export default useAxiosSecure;
