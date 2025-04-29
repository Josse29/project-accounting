import React, { useEffect, useState } from "react";
import { FormLogin } from "../features/User";
import { Accounting, InnostackLogo } from "./../assets";
import { closeApp, formatTime } from "../utils";
import { FaPowerOff } from "react-icons/fa6";
import { Tooltip } from "flowbite-react";
// import
const Login = () => {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const updateTime = () => {
    const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
      formatTime();
    setDate(indonesianDate);
    setHour(indonesiaHour);
    setMinute(indonesiaMinute);
    setSecond(indonesiaSecond);
  };
  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-800 flex justify-between items-center py-2 px-5">
        {/* Logo */}
        <div className="h-[40px] app-region-drag">
          <img src={InnostackLogo} className="h-full" />
        </div>
        <div className="flex gap-8 items-center">
          {/* Date and Time */}
          <div className="flex gap-3">
            {/* Date */}
            <div className="text-xl text-white">{date}</div>
            {/* Time */}
            <div className="flex gap-1">
              <div className="text-xl text-white">{hour}</div>
              <div className="text-xl text-white">:</div>
              <div className="text-xl text-white">{minute}</div>
              <div className="text-xl text-white">:</div>
              <div className="text-xl text-white">{second}</div>
            </div>
          </div>
          {/* close apps */}
          <div
            className="bg-red-600 text-white text-lg cursor-pointer p-2 rounded-full"
            onClick={() => closeApp()}
          >
            <Tooltip content="Close" placement="bottom" className="text-xl">
              <FaPowerOff />
            </Tooltip>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1 w-full">
        <div className="w-[60%]">
          <img
            src={Accounting}
            alt="accounting.jpg"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[40%] flex items-center">
          <div className="flex flex-col w-full px-[32px]">
            <div className="mb-3">
              <div className="text-5xl font-extrabold mb-3 text-[#1f41bb]">
                Login Here
              </div>
              <div className="text-xl font-bold">
                Welcome back you’ve been missed !
              </div>
            </div>
            <div>
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
