import React, { useContext } from "react";
import {
  FaCity,
  FaMinus,
  FaRegWindowRestore,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import {
  FaCartShopping,
  FaChartSimple,
  FaFileCirclePlus,
  FaHouse,
  FaRightFromBracket,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import { Josstack } from "./../assets";
import { Tooltip } from "flowbite-react";
import { AllContext } from "../context/AllProvider";
import { ModalLogout } from "../features/User";

const Top = () => {
  const { userLogin, setLogout } = useContext(AllContext);
  return (
    <div className="bg-[#262848] w-100 p-6 fixed z-10 left-[100px] right-0 top-0">
      <div className="flex justify-between">
        <div className="app-region-drag">
          <div className="text-3xl text-white">Software - Accounting</div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-3 items-center">
            <FaUser className="text-white text-2xl" />
            <div className="text-xl text-white">
              {userLogin.fullname || "Josse Pinem"}
            </div>
          </div>
          <div className="flex gap-5">
            <div onClick={() => window.ElectronAPI.minimize()}>
              <Tooltip
                content="Minimize"
                placement="bottom"
                className="text-xl"
              >
                <FaMinus className="text-white text-2xl cursor-pointer" />
              </Tooltip>
            </div>
            <div
              onClick={() => {
                window.ElectronAPI.restore();
              }}
            >
              <Tooltip content="Restore" placement="bottom" className="text-xl">
                <FaRegWindowRestore className="text-white text-2xl cursor-pointer" />
              </Tooltip>
            </div>
            <div
              onClick={() => {
                setLogout(true);
              }}
            >
              <Tooltip content="Logout" placement="bottom" className="text-xl">
                <FaRightFromBracket className="text-white text-2xl cursor-pointer" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SideItem = (props) => {
  const { to, icon: Icon, title } = props;
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`cursor-pointer ${
        isActive ? "p-4 bg-[#262848] rounded-md" : ""
      }`}
    >
      <Tooltip className="text-2xl" content={title} placement="right">
        <Icon
          className={`${
            isActive ? "text-4xl text-[#009ef7]" : "text-3xl text-white"
          }`}
        />
      </Tooltip>
    </Link>
  );
};
const Side = () => {
  return (
    <div className="fixed z-10 top-0 left-0 bottom-0 bg-[#1b1c30]">
      <div className="flex flex-col h-screen justify-between gap-2 px-4">
        <div className="h-[110px] flex items-center justify-center">
          <img src={Josstack} alt="" className="w-[60px]" />
        </div>
        <div className="flex flex-col flex-1 gap-12 items-center">
          <SideItem to="/dashboard" icon={FaHouse} title="Dashboard" />
          <SideItem to="/order" icon={FaCartShopping} title="Order" />
          <SideItem to="/inventory" icon={FaFileCirclePlus} title="Inventory" />
          <SideItem to="/accounting" icon={FaChartSimple} title="Accounting" />
          <SideItem to="/users" icon={FaUsers} title="Users" />
          <SideItem to="/about" icon={FaCity} title="About" />
        </div>
      </div>
    </div>
  );
};
const NavigationContainer = ({ children }) => {
  return (
    <div className="bg-[#eeeeee] ps-[100px] pt-[85px] min-h-screen">
      <Top />
      <Side />
      <div className="p-11">{children}</div>
      <ModalLogout />
    </div>
  );
};

export default NavigationContainer;
