import React, { useEffect, useRef } from "react";
import { InputBtn, Select } from "../../components";
import { getAccounting2 } from "../../utils";

const SearchLimitAccounting = (props) => {
  const {
    req,
    setReq,
    setLoading,
    setAccounting,
    setTotalRows,
    setTotalPages,
    hasTyped,
    setHasTyped,
  } = props;
  const searchTimeout = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    setReq((prev) => ({
      ...prev,
      [name]: value,
      offsetVal: 1,
    }));
    setHasTyped(true);
  };
  useEffect(() => {
    if (!hasTyped) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      const params = {
        req,
        setAccounting,
        setTotalRows,
        setTotalPages,
        setLoading,
      };
      getAccounting2(params);
    }, 1000);
    return () => clearTimeout(searchTimeout.current);
  }, [req.searchVal, req.offsetVal]);
  return (
    <>
      <Select
        className="focus:ring-[#8770ba]"
        name="limitVal"
        onChange={handleChange}
        value={req.limitVal}
      >
        <Select.Option value="10" title="10" />
        <Select.Option value="20" title="20" />
        <Select.Option value="30" title="30" />
      </Select>
      <InputBtn>
        <InputBtn.Input
          className="focus:ring-[#8770ba] w-[400px]"
          placeholder="Please input a keyword product...."
          name="searchVal"
          onChange={handleChange}
          value={req.searchVal}
        />
        <InputBtn.Btn title="Search" className="bg-[#612bde]" />
      </InputBtn>
    </>
  );
};

export default SearchLimitAccounting;
