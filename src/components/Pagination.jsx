import React from "react";
import {
  FaBackwardFast,
  FaBackwardStep,
  FaForwardFast,
  FaForwardStep,
} from "react-icons/fa6";

const BtnNumber = (props) => {
  const { totalPages, req, activeColor, currentPage } = props;
  return (
    <>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          className={`p-1 text-xl h-[50px] w-[50px] flex justify-center items-center ${
            number === req.offsetVal
              ? `${activeColor} text-white`
              : "bg-[#ffff] border border-slate-300"
          }`}
          onClick={currentPage}
        >
          {number}
        </button>
      ))}
    </>
  );
};
const Pagination = (props) => {
  const {
    req,
    totalPages,
    totalRows,
    activeColor,
    firstPage,
    prevPage,
    currentPage,
    nextPage,
    lastPage,
    ...rest
  } = props;
  return (
    <>
      {totalRows >= 1 && (
        <div>
          <div className="text-center mb-2">
            Showing Limit
            <b>{` ${totalRows >= req.limitVal ? req.limitVal : totalRows} `}</b>
            of
            <b>{` ${totalRows}`}</b> Entries
          </div>
          <div className="flex flex-rows">
            {/* first page */}
            <button
              className="bg-[#ffff] border border-slate-300 p-1 text-xl h-[50px] w-[50px] flex justify-center items-center rounded-s-lg"
              onClick={firstPage}
            >
              <FaBackwardFast />
            </button>
            {/* prev page */}
            <button
              className="bg-[#ffff] border border-slate-300 p-1 text-xl h-[50px] w-[50px] flex justify-center items-center"
              onClick={prevPage}
            >
              <FaBackwardStep />
            </button>
            {/* btnNumber */}
            <BtnNumber
              totalPages={totalPages}
              req={req}
              activeColor={activeColor}
              currentPage={currentPage}
            />
            {/* next page */}
            <button
              className="bg-[#ffff] border border-slate-300 p-1 text-xl h-[50px] w-[50px] flex justify-center items-center"
              onClick={nextPage}
            >
              <FaForwardStep />
            </button>
            <button
              className="bg-[#ffff] border border-slate-300 p-1 text-xl h-[50px] w-[50px] flex justify-center items-center rounded-e-lg"
              onClick={lastPage}
            >
              <FaForwardFast />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
