import React from "react";
import RegisterCover from "./../assets/register.svg";
import { FaHandPointRight } from "react-icons/fa";
import FormRegister from "../components/auth/FormRegister";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center gap-12 poppins">
      {/* form Register */}
      <div className="w-[410px] text-[#3669CC] text-2xl">
        <div className="text-5xl font-extrabold text-[#3669CC] mb-4 tracking-wide">
          Register Here
        </div>
        <FormRegister />
        <div className="flex gap-3 text-base">
          <div className="text-[#3669CC]">already have an account ?</div>
          <Link to="/">
            <div className="flex gap-1 items-center">
              <FaHandPointRight className="text-blue-700" />
              <div className="font-semibold text-blue-700">Login here !</div>
            </div>
          </Link>
        </div>
      </div>
      {/* Register */}
      <div>
        <img src={RegisterCover} />
      </div>
    </div>
  );
};

export default Register;
