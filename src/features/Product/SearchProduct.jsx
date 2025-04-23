import React, { useEffect, useRef, useState } from "react";
import { getProductRefStock2 } from "../../utils";

const SearchProduct = (props) => {
  const {
    setProductStock,
    setReq,
    req,
    setTotalRows,
    setTotalPages,
    setLoading,
  } = props;
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeout = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    setReq((prev) => ({
      ...prev,
      [name]: value,
      offsetVal: 1,
    }));
    setHasSearched(true);
  };
  useEffect(() => {
    if (hasSearched === false) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      getProductRefStock2({
        req,
        setProductStock,
        setTotalRows,
        setTotalPages,
        setLoading,
      });
    }, 1000);
    return () => clearTimeout(searchTimeout.current);
  }, [req.searchVal]);
  return (
    <div className="flex w-full mb-5">
      <input
        type="text"
        className="border-slate-300 focus:ring-2 focus:ring-[#0178bd] w-[90%] placeholder:text-lg"
        placeholder="Please input a keyword product...."
        name="searchVal"
        onChange={handleChange}
      />
      <button className="bg-[#0178bd] px-3 text-white w-[10%] rounded-e-lg">
        Search
      </button>
    </div>
  );
};

export default SearchProduct;
