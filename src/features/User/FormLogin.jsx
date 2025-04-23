import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";

const FormLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const req = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      {/* input email */}
      <div className="flex flex-col gap-2 mb-2">
        <label
          htmlFor="email"
          className="font-extrabold text-xl text-[#1f41bb]"
        >
          Email :
        </label>
        <input
          type="text"
          id="email"
          className="bg-[#f1f4ff] border-2 border-[#f1f4ff] rounded-md text-[#1f41bb] font-bold placeholder:text-[#1f41bb] placeholder:font-bold focus:ring-4 focus:ring-[#f1f4ff] focus:border-[3px]"
          placeholder="ex : youremail@gmail.com"
          ref={emailRef}
        />
      </div>
      {/* input password */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex justify-between items-center">
          <label
            htmlFor="password1"
            className="font-extrabold text-xl text-[#1f41bb]"
          >
            Password :
          </label>
          <div
            onClick={() => setpasswordVisible(!passwordVisible)}
            className="hover:cursor-pointer"
          >
            {passwordVisible ? (
              <FaEye className="text-[#1f41bb] text-2xl me-4" />
            ) : (
              <FaEyeSlash className="text-[#1f41bb] text-2xl me-4" />
            )}
          </div>
        </div>
        <input
          type={passwordVisible ? "text" : "password"}
          id="password1"
          className="bg-[#f1f4ff] border-2 border-[#f1f4ff] rounded-md text-[#1f41bb] font-bold placeholder:text-[#1f41bb] placeholder:font-bold focus:ring-4 focus:ring-[#f1f4ff] focus:border-[3px]"
          placeholder="******"
          ref={passwordRef}
        />
      </div>
      {/* button login */}
      <div>
        <button
          type="submit"
          className={`bg-[#1f41bb] text-white w-full py-2 rounded-md text-xl font-bold ${
            !loading && "hover:cursor-pointer"
          } ${
            loading && "cursor-not-allowed opacity-70"
          } hover:bg-[#1b38a0] hover:ring-4 hover:ring-blue-300 hover:border-white hover:border-2`}
          disabled={loading && true}
        >
          {loading ? "loading...." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
