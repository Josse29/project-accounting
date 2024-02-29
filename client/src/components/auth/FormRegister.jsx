import React from "react";
import { FaEye } from "react-icons/fa";

const FormRegister = () => {
  return (
    <div>
      {/* email */}
      <div className="mb-4">
        <div className="mb-2">Email : </div>
        <input
          type="text"
          className="w-full rounded-md bg-[#F1F4FF] border-0 focus:border-2 placeholder-[#7292B8]"
          placeholder="input your email"
        />
      </div>
      {/* fullname */}
      <div className="mb-4">
        <div className="mb-2">Fullname : </div>
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
      </div>
      {/* password */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>Confirm Password : </div>
          <FaEye className="mr-2" />
        </div>
        <input
          type="password"
          className="w-full rounded-md  bg-[#F1F4FF] border-0 focus:border-2 placeholder-[#7292B8]"
          placeholder="input your confirm password"
        />
      </div>
      {/* button submit */}
      <button className="w-full py-2 bg-[#3669CC] text-white mb-4">
        Register
      </button>
    </div>
  );
};

export default FormRegister;
