import React, { useEffect, useState } from "react";

import { Pagination } from "../../components";
import { getProduct1 } from "../../utils";

const PaginationProduct = (props) => {
  const { req, setReq, totalPages, totalRows, setProduct, ...rest } = props;
  const [eventPage, setEventPage] = useState(false);
  useEffect(() => {
    if (!eventPage) return;
    const params = { req, setProduct, setEventPage };
    getProduct1(params);
  }, [eventPage]);
  return (
    <Pagination
      req={req}
      totalPages={totalPages}
      totalRows={totalRows}
      activeColor="bg-[#3b82f6]"
      firstPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: 1 }));
        setEventPage(true);
      }}
      prevPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: req.offsetVal - 1 }));
        if (req.offsetVal === 1) {
          setReq((prev) => ({
            ...prev,
            offsetVal: totalPages,
          }));
        }
        setEventPage(true);
      }}
      currentPage={(e) => {
        const targetText = parseInt(e.target.textContent);
        setReq((prev) => ({ ...prev, offsetVal: targetText }));
        setEventPage(true);
      }}
      nextPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: req.offsetVal + 1 }));
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

export default PaginationProduct;
