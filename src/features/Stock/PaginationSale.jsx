import React, { useEffect, useState } from "react";
import { Pagination } from "../../components";
import { getSale1 } from "../../utils";

const PaginationSale = (props) => {
  const { req, setReq, totalPages, totalRows, setSale } = props;
  const [eventPage, setEventPage] = useState(false);
  useEffect(() => {
    if (!eventPage) return;
    const params = {
      req,
      setSale,
      setEventPage,
    };
    getSale1(params);
  }, [eventPage]);
  return (
    <Pagination
      req={req}
      totalRows={totalRows}
      totalPages={totalPages}
      activeColor="bg-[#273eec]"
      firstPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: 1 }));
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
        setReq((prev) => ({ ...prev, offsetVal: req.offsetVal + 1 }));
        if (req.offsetVal >= totalPages) {
          setReq((prev) => ({
            ...prev,
            offsetVal: 1,
          }));
        }
        setEventPage(true);
      }}
      lastPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: totalPages }));
        setEventPage(true);
      }}
    />
  );
};

export default PaginationSale;
