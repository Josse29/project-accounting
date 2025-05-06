import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getAdminAPI } from "../../services";

const SelectAdmin = (props) => {
  const { setLoading, ...rest } = props;
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    setLoading(true);
    try {
      const response = await getAdminAPI();
      setAdmin(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <>
      <Select.Label title="Admin" htmlFor="admin" />
      <Select id="admin" className="w-full" {...rest}>
        <Select.Option value="" title="Choose One Of Admin" />
        {admin.length >= 1 &&
          admin.map((el) => (
            <Select.Option
              key={el.UserId}
              value={el.UserId}
              title={el.UserFullname}
              data-username={el.UserName}
            />
          ))}
        {admin.length < 1 && (
          <Select.Option
            value=""
            title="admin is empty ..."
            className="text-center italic"
          />
        )}
      </Select>
    </>
  );
};

export default SelectAdmin;
