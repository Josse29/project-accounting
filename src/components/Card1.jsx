// this card with horizontally aligned text
import React, { useEffect, useState } from "react";
import { formatTime } from "../utils";

const Card1 = (props) => {
  const { page, icon, ...rest } = props;
  const [date, setDate] = useState("");
  useEffect(() => {
    const { indonesianDate } = formatTime();
    setDate(indonesianDate);
  }, []);
  return (
    <div
      className={`bg-white py-5 px-6 rounded-md flex items-center justify-between shadow-md mb-6 border-l-[18px] ${rest.className}`}
    >
      <div className="flex gap-4 text-4xl items-center">
        {icon}
        {page}
      </div>
      <div className="text-2xl">{date}</div>
    </div>
  );
};

export default Card1;
