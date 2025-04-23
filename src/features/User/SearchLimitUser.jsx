import React, { useEffect, useState } from "react";
import { InputBtn, Select } from "../../components";
import { useDebounce } from "../../hooks";
import { getUser, getUser2 } from "../../utils";

const SearchLimitUser = (props) => {
  const { setUser, setReq, req, setTotalRows, setTotalPages, setLoading } =
    props;
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 1500);
  const handleChange = (e) => {
    setLoading(true),
      setSearchInput(e.target.value),
      setReq((prev) => ({
        ...prev,
        searchVal: e.target.value,
      }));
  };
  // for search
  useEffect(() => {
    const params = {
      req,
      setLoading,
      setTotalRows,
      setTotalPages,
      setUser,
    };
    getUser(params);
  }, [debouncedSearch]);
  // for limit
  useEffect(() => {
    const params = {
      req,
      setTotalRows,
      setTotalPages,
      setUser,
    };
    getUser2(params);
  }, [req.limitVal]);
  return (
    <div className="flex gap-4">
      <Select
        className="focus:ring-[#6f67c9]"
        onChange={(e) =>
          setReq((prev) => ({
            ...prev,
            limitVal: e.target.value,
          }))
        }
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
        />
        <InputBtn.Btn title="Search" className="bg-[#4338ca]" />
      </InputBtn>
    </div>
  );
};

export default SearchLimitUser;
