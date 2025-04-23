import React, { useEffect, useRef, useState } from "react";
import { InputBtn, Select } from "../../components";
import { getStock2 } from "../../utils";
const SearchLimitStock = (props) => {
  const { req, setReq, setStock, setLoading, setTotalPages, setTotalRows } =
    props;
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeout = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    setReq((prev) => ({
      ...prev,
      offsetVal: 1,
      [name]: value,
    }));
    setHasSearched(true);
  };
  useEffect(() => {
    if (hasSearched === false) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      getStock2({
        req,
        setLoading,
        setTotalRows,
        setTotalPages,
        setStock,
      });
    }, 1000);
    return () => clearTimeout(searchTimeout.current);
  }, [req.searchVal, req.limitVal]);
  return (
    <>
      <Select
        className="focus:ring-[#3b82f6]"
        name="limitVal"
        onChange={handleChange}
      >
        <Select.Option title="10" value="10" />
        <Select.Option title="20" value="20" />
        <Select.Option title="50" value="50" />
        <Select.Option title="100" value="100" />
      </Select>
      <InputBtn>
        <InputBtn.Input
          className="focus:ring-[#3b82f6] w-[400px]"
          placeholder="Please input a keyword product...."
          name="searchVal"
          onChange={handleChange}
        />
        <InputBtn.Btn title="Search" className="bg-[#3b82f6]" />
      </InputBtn>
    </>
  );
};

export default SearchLimitStock;
