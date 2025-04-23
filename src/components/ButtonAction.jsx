import React from "react";
import { FaEye } from "react-icons/fa";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

const ButtonAction = (props) => {
  const { btnDetail, btnUpdate, btnDelete, ...rest } = props;
  return (
    <div className="flex justify-center gap-2">
      <button
        className="bg-green-500 hover:bg-green-600 hover:ring-green-400 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnDetail}
      >
        <FaEye className="text-xl text-white" />
      </button>
      <button
        className="bg-sky-600 hover:bg-sky-700 hover:ring-sky-500 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnUpdate}
      >
        <FaPencil className="text-xl text-white" />
      </button>
      <button
        className="bg-red-700 hover:bg-red-800 hover:ring-red-500 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnDelete}
      >
        <FaTrashCan className="text-xl text-white" />
      </button>
    </div>
  );
};

export default ButtonAction;
