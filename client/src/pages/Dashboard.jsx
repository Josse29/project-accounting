import React from "react";
import Container from "../layouts/Container";
import { FaDatabase, FaUsers } from "react-icons/fa";
const Dashboard = () => {
  return (
    <Container>
      <div className="flex gap-x-16 p-7 w-full">
        {/* Cash */}
        <div className="flex bg-white px-5 py-8 shadow-md w-1/2 gap-8 border-r-[22px] border-[#14B8A6] rounded-r-2xl">
          <div>
            <FaDatabase className="text-[#14B8A6] text-[150px]" />
          </div>
          <div className="text-black flex flex-col justify-evenly">
            <div className="text-8xl">$ 10</div>
            <div className="text-2xl font-bold">Cash </div>
            <div className="text-[#827e7e]">See Detail &raquo;</div>
          </div>
        </div>
        {/* User */}
        <div className="flex bg-white px-5 py-8 shadow-md w-1/2 gap-8 border-r-[22px] border-[#0891B2] rounded-r-2xl">
          <div>
            <FaUsers className="text-[#0891B2] text-[150px]" />
          </div>
          <div className="text-black flex flex-col justify-evenly">
            <div className="text-8xl">8</div>
            <div className="text-2xl">User </div>
            <div className="text-[#827e7e]">See Detail &raquo;</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
