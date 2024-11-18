import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser, setLoading, setToken, setUser} from "../redux/features/userSlice";
import { useEffect } from "react";
import { useAddUserMutation, useSaveJwtMutation } from "../redux/baseapi/baseApi";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";

const Signup = () => {
  const navigate = useNavigate()
  const [saveJwt] = useSaveJwtMutation();
  const {email, isLoading} = useSelector(state => state.userSlice.user)
  const [addUser, {data }] = useAddUserMutation()
  const googleProvider = new GoogleAuthProvider()
  const dispatch = useDispatch();

  const handleGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider)
    console.log(res.user);
    if(res?.user){
      await dispatch(setUser({
        email: res.user.email,
        name: res.user.displayName
      }))
      const userInfo = {
        name: res.user.displayName,
        email: res.user.email,
      }
      await addUser(userInfo)
      const user = { email: res.user.email };
      console.log(user);
      const response = await saveJwt(user);
      console.log(response);
      if (response?.data?.token) {
        localStorage.setItem("access-token", response.data.token);
        // const accessToken = localStorage.getItem("access-token")
        dispatch(
          setToken({
            token: response.data.token,
          })
        );
        // dispatch(setLoading(false));
        navigate("/");
      }
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async({ email, password, name }) => {
    console.log(email, password, name);
    await dispatch(
      createUser({
        email,
        password,
        name,
      })
    );
    const userInfo = {
      name: name,
      email: email,
    }
    console.log(userInfo);
    const res = await addUser(userInfo)
    if(res?.data?.insertedId){
      const user = { email: email };
      console.log(user);
      const response = await saveJwt(user);
      console.log(response);
      if (response?.data?.token) {
        localStorage.setItem("access-token", response.data.token);
        // const accessToken = localStorage.getItem("access-token")
        dispatch(
          setToken({
            token: response.data.token,
          })
        );
        // dispatch(setLoading(false));
        navigate("/");
      }
    }
  };

  return (
    <div>
      <div className="pt-12 lg:pt-16">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col md:flex-row-reverse max-w-7xl mx-auto gap-16">
            <div className="hidden md:block">
              <img
                src="https://i.ibb.co.com/Kz1CYVF/6325230-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="card shrink-0 border-2 border-green-400 w-64 md:w-80 lg:w-[450px]">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-base">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="outline-none px-3 py-2 rounded-lg border-2 border-green-300 lg:w-96"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-base">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Your Name"
                    className="outline-none px-3 py-2 rounded-lg border-2 border-green-300 lg:w-96"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-base">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="outline-none px-3 py-2 rounded-lg border-2 border-green-300 lg:w-96"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-base">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      pattern: /^(?=.*[A-Z]).{6,}$/,
                    })}
                    placeholder="Password"
                    className="outline-none px-3 py-2 rounded-lg border-2 border-green-300 lg:w-96"
                    required
                  />
                  <div className="py-1">
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-600">
                        Password must have 6 characters with one uppercase word
                      </p>
                    )}
                  </div>
                  <label className="label">
                    <p className="text-sm lg:text-base">
                      Already Have An Account? Please{" "}
                      <Link
                        to="/signin"
                        className="text-blue-600 font-bold cursor-pointer"
                      >
                        Sign In...
                      </Link>
                    </p>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-green-600 hover:bg-green-400 w-40 mx-auto text-white text-base">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mx-auto pb-7">
                <button onClick={handleGoogle} className="text-lg lg:text-3xl btn bg-gray-300 hover:bg-gray-100 mx-auto text-white flex items-center">
                  <FcGoogle />{" "}
                  <p className="text-lg text-black">SignUp with Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
