import React, { useContext } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { AuthContext } from "../Context Api/AuthContext";

const ForgetPass = () => {
    const {email,auth}=useContext(AuthContext);
  const handleForget = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
   sendPasswordResetEmail(auth,email)
   .then(()=>{
     toast.success(" Password reset email sent!")
      window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
   })
   .catch(error=>{
    toast.error(error.message)
   })
    
    
  };

  

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center ">
        <title>Kidz-Corner-ForgetPass</title>
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-center transition-all duration-300 hover:shadow-[#239EAB]/40">
        <h1 className="text-3xl font-bold text-black  mb-3">
          Forgot Password?
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleForget}>
          <input
            type="email"
            name="email"
            defaultValue={email}
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 focus:border-[#239EAB] rounded-lg px-4 py-2 mb-4 outline-none transition-all duration-300"
          />

          <button
          
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-[#F2994A] to-[#F2C94C] text-white font-bold hover:from-[#F2C94C] hover:to-[#F2994A] transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-[#239EAB] hover:underline">
            Go back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;