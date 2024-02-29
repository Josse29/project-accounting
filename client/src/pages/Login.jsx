import React from "react";
import LoginCover from "./../assets/login.svg";
import FormLogin from "./../components/auth/FormLogin";
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center gap-12 poppins">
      {/* Login */}
      <div>
        <img src={LoginCover} />
      </div>
      {/* form login */}
      <div className="w-[410px]">
        <div className="text-5xl font-extrabold text-[#3669CC] mb-4 tracking-wide">
          Login Here
        </div>
        <div className="text-lg mb-4 font-bold">
          Welcome back you’ve been missed !
        </div>
        <FormLogin />
        <div className="flex gap-3 text-base">
          <div className="text-[#3669CC]">Don’t have an account yet ?</div>
          <Link to="/register">
            <div className="flex gap-1 items-center">
              <FaHandPointRight className="text-blue-700" />
              <div className="font-semibold text-blue-700">Register here !</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
