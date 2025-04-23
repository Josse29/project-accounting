import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getUserListAPI } from "../../services";

const SelectUser = (props) => {
  const { className, setLoading, ...rest } = props;
  const [listUser, setListUser] = useState([]);
  const getUserList = async () => {
    try {
      setLoading(true);
      const userList = await getUserListAPI();
      setListUser(userList);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserList();
  }, []);
  return (
    <>
      <Select.Label title="User" htmlFor="user" />
      <Select className={`w-full ${className}`} id="user" {...rest}>
        <Select.Option title="Chosse One Of Users" value="" />
        {listUser.length >= 1 &&
          listUser.map((el) => (
            <Select.Option
              key={el.UserId}
              title={el.UserFullname}
              value={el.UserFullname}
              data-email={el.UserEmail}
            />
          ))}
        {listUser.length < 1 && (
          <Select.Option
            title="No User"
            value=""
            className="text-center italic"
          />
        )}
      </Select>
    </>
  );
};

export default SelectUser;
