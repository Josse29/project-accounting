import React from "react";
import logo from "./../assets/logoMsd.svg";
import { Tooltip } from "flowbite-react";
import { FaBook, FaDatabase, FaHome, FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
const SideDashboard = () => {
  return (
    <div className="bg-[#262848] w-[120px] p-3 absolute top-0 bottom-0">
      <div className="flex justify-center mb-10 py-3">
        <img src={logo} />
      </div>
      <div>
        <div className="flex justify-center mb-8 cursor-pointer">
          <Tooltip content="Home" placement="right">
            <FaHome className="text-3xl" />
          </Tooltip>
        </div>
        <div className="flex justify-center mb-8 cursor-pointer">
          <Tooltip content="Keuangan" placement="right">
            <FaDatabase className="text-3xl" />
          </Tooltip>
        </div>
        <div className="flex justify-center mb-8 cursor-pointer">
          <Tooltip content="Transaksi" placement="right">
            <FaMoneyBillTrendUp className="text-3xl" />
          </Tooltip>
        </div>
        <div className="flex justify-center mb-8 cursor-pointer">
          <Tooltip content="Akun" placement="right">
            <FaBook className="text-3xl" />
          </Tooltip>
        </div>
        <div className="flex justify-center mb-8 cursor-pointer">
          <Tooltip content="Users" placement="right">
            <FaUsers className="text-3xl" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SideDashboard;
