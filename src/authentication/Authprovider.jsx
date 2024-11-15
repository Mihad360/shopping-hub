import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth from "../firebase/firebase.config";
import { setLoading, setToken, setUser } from "../redux/features/userSlice";
import { useSaveJwtMutation } from "../redux/baseapi/baseApi";

const AuthProvider = ({ children }) => {
  const [saveJwt, { data }] = useSaveJwtMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setTimeout(async () => {
        if (currentUser) {
          await dispatch(
            setUser({
              name: currentUser.displayName || "",
              email: currentUser.email,
            })
          );
          const userInfo = { email: currentUser.email };
          const res = await saveJwt(userInfo);
          console.log(res);
          if (res.data.token) {
            // localStorage.setItem("access-token", res.data.token);
            // const accessToken = localStorage.getItem("access-token")
            dispatch(setToken({
                token: res.data.token
              }))
            dispatch(setLoading(false));
          }
        } else {
          localStorage.removeItem("access-token");
          dispatch(setToken({
            token: ''
          }))
          dispatch(setLoading(false));
        }
      }, 1000);
    });

    return () => {
      return unsubscribe();
    };
  }, [dispatch,saveJwt]);

  return <>{children}</>;
};

export default AuthProvider;
