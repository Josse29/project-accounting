import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="text-2xl text-[#3669CC]">
      {/* email */}
      <div className="mb-4">
        <div className="mb-2">Email : </div>
        <input
          type="text"
          className="w-full rounded-md bg-[#F1F4FF] border-0 focus:border-2 placeholder-[#7292B8]"
          placeholder="input your email"
        />
      </div>
      {/* password */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>Password : </div>
          <FaEye className="mr-2" />
        </div>
        <input
          type="password"
          className="w-full rounded-md  bg-[#F1F4FF] border-0 focus:border-2 placeholder-[#7292B8]"
          placeholder="input your password"
        />
        <div className="text-right text-base mx-2 my-3">forgot password ? </div>
      </div>
      {/* button submit */}
      <button
        className="w-full py-2 bg-[#3669CC] text-white mb-4"
        onClick={() => navigate("/dashboard")}
      >
        Login
      </button>
    </div>
  );
};

export default FormLogin;
