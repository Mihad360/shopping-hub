import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAddUserMutation } from "../redux/baseapi/baseApi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Signup = () => {
  const [addUser] = useAddUserMutation();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data?.image[0] };
    const responseImage = await axios.post(image_hosting_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imageUrl = await responseImage?.data?.data?.display_url;
    await createUser(data.email, data.password).then(async (res) => {
      await updateProfile(res.user, {
        displayName: data.name,
        photoURL: imageUrl,
      });
    });
    const userInfo = {
      name: data.name,
      email: data.email,
      imageURL: imageUrl,
    };
    const res = await addUser(userInfo);
    if (res?.data.insertedId) {
      toast("✔️ You are Signed Upped", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      await navigate("/");
      window.location.reload();
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
              {/* <div className="mx-auto pb-7">
                <button
                  onClick={handleGoogle}
                  className="text-lg lg:text-3xl btn bg-gray-300 hover:bg-gray-100 mx-auto text-white flex items-center"
                >
                  <FcGoogle />{" "}
                  <p className="text-lg text-black">SignUp with Google</p>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
