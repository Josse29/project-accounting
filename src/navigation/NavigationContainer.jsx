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
import { Link, useLocation, useNavigate } from "react-router";
import { InnostackLogo1 } from "./../assets/";
import { Tooltip } from "flowbite-react";
import { AllContext } from "../context/AllProvider";

const Top = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(AllContext);
  return (
    <div className="bg-[#262848] w-100 p-6 fixed z-10 left-[100px] right-0 top-0">
      <div className="flex justify-between">
        <div className="app-region-drag">
          <div className="text-3xl text-white">Accounting</div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-3 items-center">
            <FaUser className="text-white text-2xl" />
            <div className="text-xl text-white">{userLogin.fullname}</div>
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
                setUserLogin({});
                localStorage.removeItem("verifyToken");
                navigate("/");
              }}
            >
              <FaRightFromBracket className="text-white text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const NavItem = (props) => {
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
      <div className="flex flex-col h-screen justify-between gap-2 px-4 ">
        <div className="h-[110px] flex items-center justify-center">
          <img src={InnostackLogo1} alt="" className="w-[60px]" />
        </div>
        <div className="flex flex-col flex-1 gap-12 items-center">
          <NavItem to="/dashboard" icon={FaHouse} title="Dashboard" />
          <NavItem to="/order" icon={FaCartShopping} title="Order" />
          <NavItem to="/inventory" icon={FaFileCirclePlus} title="Inventory" />
          <NavItem to="/accounting" icon={FaChartSimple} title="Accounting" />
          <NavItem to="/users" icon={FaUsers} title="Users" />
          <NavItem to="/about" icon={FaCity} title="About" />
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
    </div>
  );
};

export default NavigationContainer;
