import { Eye, EyeOff } from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

const Login = () => {
  const { LogInFunc, auth, setemail,signInWithPopup } = useContext(AuthContext);
  const navigate =useNavigate();
 const location= useLocation();
  const [see, setsee] = useState(false);

  const googlelogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Successfully Logged In");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handlelogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    LogInFunc(email, password)
      .then(() => {
        toast.success("Successfully Logged In");
        e.target.reset();
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("❌ No account found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("❌ Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            toast.error("❌ Please enter a valid email address.");
            break;
          default:
            toast.error(`⚠️ ${error.message}`);
        }
      });
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <title>SmartUtility-Login</title>
      <div className="hero w-full max-w-4xl ">
        <div className="card w-full max-w-sm bg-white shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">
              Login to Smart<span className="text-[#023e8a]">Utility</span>
            </h2>
            <form onSubmit={handlelogin}>
              <div className="form-control">
                <label className="label font-semibold">Email</label>
                <input
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mt-4 relative">
                <label className="label font-semibold">Password</label>
                <input
                  name="password"
                  type={see ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => setsee(!see)}
                  className="absolute right-3 top-8 z-10"
                >
                  {see ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <label className="label">
                <NavLink
                  to={"/forget-pass"}
                  href="#"
                  className="link link-hover text-blue-500"
                >
                  Forgot password?
                </NavLink>
              </label>

              <button className="btn btn-gradient btn-block mt-6 bg-gradient-to-r from-[#F2994A] to-[#F2C94C] text-white font-bold hover:from-[#F2C94C] hover:to-[#F2994A] transition-all">
                Login
              </button>
            </form>
            <button
              onClick={googlelogin}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <NavLink
                className="text-[#239EAB] font-semibold link link-hover"
                to={"/register"}
              >
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
