import React from "react";
import { FaUserTie } from "react-icons/fa";

const CardUser1 = () => {
  return (
    <div className="w-1/2 flex gap-4 items-center bg-white border-l-[22px] border-[#0891b2] rounded-r-3xl px-4 py-6 shadow-xl">
      <div>
        <FaUserTie className="text-9xl text-[#0891b2]" />
      </div>
      <div>
        <div className="text-5xl font-bold mb-2 truncate hover:cursor-pointer hover:text-wrap">
          5
        </div>
        <div className="text-2xl">User</div>
      </div>
    </div>
  );
};

export default CardUser1;
