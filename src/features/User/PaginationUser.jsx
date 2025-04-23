import React, { useEffect } from "react";
import { Pagination } from "../../components";
import { getUser1 } from "../../utils";

const PaginationUser = (props) => {
  const {
    firstPage,
    prevPage,
    currentPage,
    nextPage,
    lastPage,
    totalPages,
    req,
    setReq,
    totalRows,
    setUser,
    ...rest
  } = props;
  useEffect(() => {
    getUser1(req, setUser);
  }, [req.offsetVal]);
  return (
    <Pagination
      totalPages={totalPages}
      req={req}
      totalRows={totalRows}
      activeColor="bg-[#4338ca]"
      firstPage={() => {
        setReq((prev) => ({
          ...prev,
          offsetVal: 1,
        }));
      }}
      prevPage={() => {
        setReq((prev) => ({
          ...prev,
          offsetVal: req.offsetVal - 1,
        }));
        if (req.offsetVal === 1) {
          setReq((prev) => ({
            ...prev,
            offsetVal: totalPages,
          }));
        }
      }}
      currentPage={(e) => {
        const targetText = e.target.textContent;
        setReq((prev) => ({
          ...prev,
          offsetVal: parseInt(targetText),
        }));
      }}
      nextPage={() => {
        setReq((prev) => ({
          ...prev,
          offsetVal: req.offsetVal + 1,
        }));
        if (req.offsetVal === totalPages) {
          setReq((prev) => ({
            ...prev,
            offsetVal: 1,
          }));
        }
      }}
      lastPage={() => {
        setReq((prev) => ({
          ...prev,
          offsetVal: totalPages,
        }));
      }}
    />
  );
};

export default PaginationUser;
