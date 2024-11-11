import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { setLoading, setUser } from "../redux/features/userSlice";

// eslint-disable-next-line react/prop-types
const Privateroute = ({ children }) => {
  const { pathname } = useLocation();
  const { email, isLoading } = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  console.log(email, isLoading);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setTimeout(() => {
        if (currentUser) {
          dispatch(
            setUser({
              name: currentUser.displayName || "",
              email: currentUser.email,
            })
          );
        }
        dispatch(setLoading(false)); // Stop loading after checking auth status
      },1000); // Adjust delay as needed
    });
  
    return () => unsubscribe();
  }, [dispatch]);
  
  // Show a loading message if isLoading is true
  if (isLoading) {
    return <p className="py-32">Loading .........</p>;
  }
  
  // Proceed with redirect logic
  return email ? children : <Navigate to="/signin" state={{ path: pathname }} />;
  
};

export default Privateroute;
