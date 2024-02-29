import { Tooltip } from "flowbite-react";
import React from "react";
import { FaAngleRight, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

const TopDashboard = () => {
  return (
    <div className="bg-[#303358] flex justify-between px-12 py-5 text-xl ml-[120px]">
      <div>
        <div>Accounting Software</div>
        <div className="flex items-center text-base">
          <div>Dashboard</div>
          <FaAngleRight />
          <div className="text-stone-300">Home</div>
        </div>
      </div>
      <div className="flex items-center gap-5 text-2xl">
        <IoIosNotifications />
        <IoSettings />
        <div className="flex gap-4">
          <div className="text-xl">Josse Surya Pinem</div>
          <div>
            <FaUserAlt />
          </div>
        </div>
        <Link to="/">
          <Tooltip content="Keluar" placement="bottom">
            <FaSignOutAlt />
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default TopDashboard;
