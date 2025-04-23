import React, { useEffect, useRef, useState } from "react";
import { InputBtn, Select } from "../../components";
import { getProduct2 } from "../../utils";

const SearchLimitProduct = (props) => {
  const { setProduct, setReq, req, setTotalRows, setTotalPages, setLoading } =
    props;
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeout = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    setReq((prev) => ({ ...prev, [name]: value, offsetVal: 1 }));
    setHasSearched(true);
  };
  useEffect(() => {
    if (hasSearched === false) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      getProduct2({
        req,
        setLoading,
        setProduct,
        setTotalRows,
        setTotalPages,
      });
    }, 1000);
    return () => clearTimeout(searchTimeout.current);
  }, [req.searchVal, req.limitVal]);
  return (
    <div className="flex gap-4">
      <Select
        className="focus:ring-[#3b82f6]"
        name="limitVal"
        onChange={handleChange}
      >
        <Select.Option title="10" value="10" />
        <Select.Option title="20" value="20" />
        <Select.Option title="30" value="30" />
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
    </div>
  );
};

export default SearchLimitProduct;
