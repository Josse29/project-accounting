import React, { useEffect, useState } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { getCashAPI } from "../../services/accounting";
import { formatCurrency1 } from "../../utils";

const CardCash = () => {
  const [cash, setCash] = useState(0);
  const getCash = async () => {
    try {
      const response = await getCashAPI();
      setCash(response);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getCash();
  }, []);
  return (
    <div className="w-1/2 flex gap-4 items-center bg-white border-l-[22px] border-[#14b8a6] rounded-r-3xl px-4 py-6 shadow-xl">
      <div>
        <FaSackDollar className="text-9xl text-[#14b8a6]" />
      </div>
      <div className="overflow-hidden">
        <div className="text-5xl font-bold mb-2 whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible hover:break-words hover:cursor-pointer transition-all duration-300">
          {formatCurrency1(cash)}
        </div>
        <div className="text-2xl">Cash</div>
      </div>
    </div>
  );
};

export default CardCash;
