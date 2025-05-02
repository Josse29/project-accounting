import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { loginUserAPI } from "../../services/user";

const FormLogin = () => {
  const userNameRef = useRef();
  const [formData, setFormData] = useState({
    UserNameVal: "",
    UserPasswordVal: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    userNameRef.current.focus();
  }, []);
  const handleLogin = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await loginUserAPI(formData);
      const { msg, token } = response;
      localStorage.setItem("verifyToken", JSON.stringify(token));
      Swal.fire({
        title: msg,
        icon: "success",
        confirmButtonText: "Login",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      const errMsg = error.message.split(":")[2] || error;
      Swal.fire({
        title: errMsg,
        icon: "error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      {/* input userName */}
      <div className="flex flex-col gap-2 mb-2">
        <label
          htmlFor="userName"
          className="font-extrabold text-xl text-[#1f41bb]"
        >
          Username :
        </label>
        <input
          type="text"
          name="UserNameVal"
          value={formData.UserNameVal}
          onChange={handleChange}
          id="userName"
          className="bg-[#f1f4ff] border-2 border-[#f1f4ff] rounded-md text-[#1f41bb] font-bold placeholder:text-[#1f41bb] placeholder:font-bold focus:ring-4 focus:ring-[#f1f4ff] focus:border-[3px]"
          placeholder="ex : pinemjosse29"
          ref={userNameRef}
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
          name="UserPasswordVal"
          value={formData.UserPasswordVal}
          onChange={handleChange}
          type={passwordVisible ? "text" : "password"}
          id="password1"
          className="bg-[#f1f4ff] border-2 border-[#f1f4ff] rounded-md text-[#1f41bb] font-bold placeholder:text-[#1f41bb] placeholder:font-bold focus:ring-4 focus:ring-[#f1f4ff] focus:border-[3px]"
          placeholder="******"
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
