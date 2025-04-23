import React, { useEffect, useRef, useState } from "react";
import { InputBtn, Select } from "../../components";
import { getSale2 } from "../../utils";

const SearchLimitSale = (props) => {
  const { req, setReq, setLoading, setSale, setTotalRows, setTotalPages } =
    props;
  const [hasTyped, setHasTyped] = useState(false);
  const searchTimeOut = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    setReq((prev) => ({
      ...prev,
      offsetVal: 1,
      [name]: value,
    }));
    setHasTyped(true);
  };
  useEffect(() => {
    if (hasTyped === false) return;
    clearTimeout(searchTimeOut.current);
    searchTimeOut.current = setTimeout(() => {
      getSale2({
        req,
        setSale,
        setTotalRows,
        setTotalPages,
        setLoading,
      });
    }, 1000);
    return () => clearTimeout(searchTimeOut.current);
  }, [req.searchVal, req.limitVal]);
  return (
    <>
      <Select
        className="focus:ring-[#273eec]"
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
          placeholder="Please input a keyword product...."
          className="focus:ring-[#273eec] w-[400px]"
          name="searchVal"
          onChange={handleChange}
        />
        <InputBtn.Btn title="Search" className="bg-[#273eec]" />
      </InputBtn>
    </>
  );
};

export default SearchLimitSale;
