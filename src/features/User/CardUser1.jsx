import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { getUserPaginationAPI } from "../../services";

const CardUser1 = () => {
  const [user, setUser] = useState(0);
  const getUserTotal = async () => {
    try {
      const api = await getUserPaginationAPI({ searchVal: "", limitVal: 1 });
      const { totalRow, totalPage } = api;
      setUser(totalRow);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getUserTotal();
  }, []);
  return (
    <div className="w-1/2 flex gap-4 items-center bg-white border-l-[22px] border-[#0891b2] rounded-r-3xl px-4 py-6 shadow-xl">
      <div>
        <FaUserTie className="text-9xl text-[#0891b2]" />
      </div>
      <div>
        <div className="text-5xl font-bold mb-2 truncate hover:cursor-pointer hover:text-wrap">
          {user}
        </div>
        <div className="text-2xl">User</div>
      </div>
    </div>
  );
};

export default CardUser1;
