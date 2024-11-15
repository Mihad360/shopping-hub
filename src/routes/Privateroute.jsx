import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { setLoading, setToken, setUser } from "../redux/features/userSlice";
import { useSaveJwtMutation } from "../redux/baseapi/baseApi";

// eslint-disable-next-line react/prop-types
const Privateroute = ({ children }) => {
  const { pathname } = useLocation();
  const { email, isLoading } = useSelector((state) => state.userSlice.user);
  const [saveJwt, { data }] = useSaveJwtMutation();
  const dispatch = useDispatch();
  console.log(email, isLoading);

  // useEffect(() => {
  //   // dispatch(setLoading(true));
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     console.log(currentUser);
  //     setTimeout(async () => {
  //       if (currentUser) {
  //         dispatch(
  //           setUser({
  //             name: currentUser.displayName || "",
  //             email: currentUser.email,
  //           })
  //         );
  //         const userInfo = { email: currentUser.email };
  //         const res = await saveJwt(userInfo);
  //         console.log(res);
  //         // dispatch(setToken({
  //         //   token: res.data.token
  //         // }))
  //         if (res.data.token) {
  //           localStorage.setItem("access-token", res.data.token);
  //           dispatch(setLoading(false));
  //         }
  //       } else {
  //         localStorage.removeItem("access-token");
  //         dispatch(setLoading(false));
  //       }
  //     }, 1000);
  //   });

  //   return () => {
  //     return unsubscribe();
  //   };
  // }, [dispatch,saveJwt]);

  // Show a loading message if isLoading is true
  if (isLoading) {
    return <p className="py-32">Loading .........</p>;
  }

  // Proceed with redirect logic
  return email ? (
    children
  ) : (
    <Navigate to="/signin" state={{ path: pathname }} />
  );
};

export default Privateroute;
