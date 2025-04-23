import React, { useEffect, useState } from "react";
import { Pagination } from "../../components";
import { getAccounting1 } from "../../utils";

const PaginationAccounting = (props) => {
  const { req, setReq, totalPages, totalRows, setAccounting } = props;
  const [eventPage, setEventPage] = useState(false);
  useEffect(() => {
    if (!eventPage) return;
    const params = {
      req,
      setAccounting,
      setEventPage,
    };
    getAccounting1(params);
  }, [eventPage]);
  return (
    <Pagination
      req={req}
      totalPages={totalPages}
      totalRows={totalRows}
      activeColor="bg-[#612bde]"
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
        if (req.offsetVal <= 1) {
          setReq((prev) => ({ ...prev, offsetVal: totalPages }));
        }
        setEventPage(true);
      }}
      currentPage={(e) => {
        const targetText = parseInt(e.target.textContent);
        setReq((prev) => ({
          ...prev,
          offsetVal: targetText,
        }));
        setEventPage(true);
      }}
      nextPage={() => {
        setReq((prev) => ({
          ...prev,
          offsetVal: req.offsetVal + 1,
        }));
        if (req.offsetVal >= totalPages) {
          setReq((prev) => ({ ...prev, offsetVal: 1 }));
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

export default PaginationAccounting;
