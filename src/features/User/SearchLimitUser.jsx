import React, { useEffect, useRef, useState } from "react";
import { InputBtn, Select } from "../../components";
import { getUser2 } from "../../utils";

const SearchLimitUser = (props) => {
  const { setUser, setReq, req, setTotalRows, setTotalPages, setLoading } =
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
    if (!hasSearched) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      getUser2({
        req,
        setLoading,
        setTotalRows,
        setTotalPages,
        setUser,
      });
    }, 1000);
    return () => clearTimeout(searchTimeout.current);
  }, [req.searchVal, req.limitVal]);
  return (
    <div className="flex gap-4 w-full">
      <Select
        className="focus:ring-[#6f67c9] w-[90px]"
        onChange={handleChange}
        name="limitVal"
      >
        <Select.Option value="10" title="10" />
        <Select.Option value="20" title="20" />
        <Select.Option value="30" title="30" />
        <Select.Option value="50" title="50" />
        <Select.Option value="100" title="100" />
      </Select>
      <InputBtn>
        <InputBtn.Input
          className="focus:ring-[#6f67c9] w-[400px]"
          placeholder="Please input a keyword User...."
          onChange={handleChange}
          name="searchVal"
        />
        <InputBtn.Btn title="Search" className="bg-[#4338ca]" />
      </InputBtn>
    </div>
  );
};

export default SearchLimitUser;
