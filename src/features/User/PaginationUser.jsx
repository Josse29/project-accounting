import React, { useEffect, useState } from "react";
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
  const [eventPage, setEventPage] = useState(false);
  useEffect(() => {
    if (!eventPage) return;
    getUser1({ req, setUser, setEventPage });
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
        setEventPage(true);
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
        setEventPage(true);
      }}
      currentPage={(e) => {
        const targetText = e.target.textContent;
        setReq((prev) => ({
          ...prev,
          offsetVal: parseInt(targetText),
        }));
        setEventPage(true);
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
        setEventPage(true);
      }}
      lastPage={() => {
        setReq((prev) => ({
          ...prev,
          offsetVal: totalPages,
        }));
        setEventPage(true);
      }}
    />
  );
};

export default PaginationUser;
