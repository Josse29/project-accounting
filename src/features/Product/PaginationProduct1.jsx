import React, { useEffect, useState } from "react";
import { Pagination } from "../../components";
import { getProductRefStock1 } from "../../utils";

const PaginationProduct1 = (props) => {
  const { req, setReq, totalPages, totalRows, setProductStock } = props;
  const [eventPage, setEventPage] = useState(false);
  useEffect(() => {
    if (!eventPage) return;
    getProductRefStock1({ req, setProductStock, setEventPage });
  }, [eventPage]);
  return (
    <Pagination
      activeColor="bg-[#0178bd]"
      req={req}
      totalRows={totalRows}
      totalPages={totalPages}
      firstPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: 1 }));
        setEventPage(true);
      }}
      prevPage={() => {
        setReq((prev) => ({ ...prev, offsetVal: req.offsetVal - 1 }));
        if (req.offsetVal <= 1) {
          setReq((prev) => ({ ...prev, offsetVal: totalPages }));
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
        if (req.offsetVal >= totalPages) {
          setReq((prev) => ({ ...prev, offsetVal: 1 }));
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

export default PaginationProduct1;
