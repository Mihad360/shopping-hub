/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createSignin } from "../redux/features/userSlice";
import { useEffect } from "react";

const Signin = () => {
  const navigate = useNavigate()
  const {email, isLoading} = useSelector(state => state.userSlice.user)
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = ({email, password}) => {
    console.log(email, password);
    dispatch(
      createSignin({
        email,
        password,
      })
    );
  };

  
  useEffect(() => {
    if (!isLoading && email) {
      navigate("/");
    }
  }, [isLoading, email, navigate]);

  return (
    <div>
      <div className="pt-12">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col md:flex-row max-w-7xl mx-auto gap-16">
            <div className="hidden md:block">
              <img
                src="https://i.ibb.co.com/hBG2jcM/3094352-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="card shrink-0 border-2 border-green-400 w-64 md:w-80 lg:w-[450px]">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base text-black">
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
                    <span className="label-text text-base text-black">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="outline-none px-3 py-2 rounded-lg border-2 border-green-300 lg:w-96"
                    required
                  />
                  <label className="label">
                    <p className="text-sm lg:text-base">
                      Don't Have An Account? Please{" "}
                      <Link
                        to="/signup"
                        className="text-blue-600 font-bold cursor-pointer"
                      >
                        Sign Up...
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
                <button className="text-xl lg:text-3xl btn bg-gray-300 hover:bg-gray-100 mx-auto text-white flex items-center">
                  <FcGoogle />{" "}
                  <p className="text-lg text-black">Login with Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
