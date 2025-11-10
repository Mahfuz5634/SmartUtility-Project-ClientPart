import { Eye, EyeOff, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../Context Api/AuthContext";

const RegisterPage = () => {
    const [error,seterror]=useState('')
    const {SignInFunc,auth}=useContext(AuthContext);
    const [see,setsee] = useState(false);
    const provider = new GoogleAuthProvider()
    const navigate =useNavigate();
  const handlesignin=(e)=>{
    e.preventDefault();
    const name=e.target.name.value;
    const email=e.target.email.value;
    const photo=e.target.photo.value;
    const password=e.target.password.value;
    console.log(name,email,password);

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if(!passwordRegex.test(password)){
        seterror('Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.')
        return;
    }


    SignInFunc(email,password)
    .then(res=>{
        updateProfile(res.user,{
            displayName: name,
          photoURL: photo
        })
        .then(()=>{
            toast.success("Register Account Succesfully")
             e.target.reset();
             navigate('/')
        })
       .catch((error) => {
    switch(error.code){
        case 'auth/email-already-in-use':
            toast.error("This email is already registered. Please login or use another email.");
            break;
        case 'auth/invalid-email':
            toast.error("Invalid email format. Please enter a valid email.");
            break;
        case 'auth/operation-not-allowed':
            toast.error("Email/password accounts are not enabled. Contact support.");
            break;
        case 'auth/weak-password':
            toast.error("Password is too weak. Must be at least 6 characters long and include uppercase & lowercase letters.");
            break;
        default:
            toast.error("Something went wrong: " + error.message);
    }
});


    })
    .catch((error) => {
    switch(error.code){
        case 'auth/email-already-in-use':
            toast.error("This email is already registered. Please login or use another email.");
            break;
        case 'auth/invalid-email':
            toast.error("Invalid email format. Please enter a valid email.");
            break;
        case 'auth/operation-not-allowed':
            toast.error("Email/password accounts are not enabled. Contact support.");
            break;
        case 'auth/weak-password':
            toast.error("Password is too weak. Must be at least 6 characters long and include uppercase & lowercase letters.");
            break;
        default:
            toast.error("Something went wrong: " + error.message);
    }
});


    
  }

  const googlesignin =()=>{
        signInWithPopup(auth,provider)
        .then( ()=>{
          toast.success("Register Account Succesfully"),
          navigate('/')

        })
        .cathc(error=>{
          toast.error("Something went wrong: " + error.message);
        })
  }

  return (
    <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
         <title>Kidz-Corner-Register</title>
      <div className="hero w-full max-w-4xl">
        <div className="card w-full max-w-sm bg-white shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">
              Register at KidzCorner
            </h2>
            <form onSubmit={handlesignin}>
                
            {/* Name */}
            <div className="form-control">
              <label className="label font-semibold">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div className="form-control mt-4">
              <label className="label font-semibold">Email</label>
              <input
                 name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control mt-4">
              <label className="label font-semibold">Photo URL</label>
              <input
                name="photo"
                type="text"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div className="form-control mt-4 relative">
              <label className="label font-semibold">Password</label>
              <input
                name="password"
                type={see?'text':'password'}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
              <button type="button"
                onClick={()=>setsee(!see)}
                className="absolute right-3 top-8 z-10"
              >
                 {see?<EyeOff size={20}/>:<Eye size={20}/>}
              </button>
            </div>
            <p className="text-rose-400">{error}</p>

            {/* Register Button */}
            <button type="submit" className="btn btn-gradient btn-block mt-6 bg-gradient-to-r from-[#F2994A] to-[#F2C94C] text-white font-bold hover:from-[#F2C94C] hover:to-[#F2994A] transition-all">
              Register
            </button>
            </form>

            {/* Google Login */}
            <button onClick={googlesignin} className="btn bg-white text-black border-[#e5e5e5] ">
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
              Register with Google
            </button>

            {/* Link to Login */}
            <p className="text-center text-gray-500 mt-4">
              Already have an account?{" "}
                
            
               <NavLink className="text-[#239EAB] font-semibold link link-hover" to={'/login'}>Login</NavLink>
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;