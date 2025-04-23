import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getCustomerAPI } from "../../services";

const SelectCustomer = (props) => {
  const { className, setLoading, ...rest } = props;
  const [customers, setCustomers] = useState([]);
  const getCustomer = async () => {
    try {
      setLoading(true);
      const response = await getCustomerAPI();
      setCustomers(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);
  return (
    <>
      <Select.Label title="Customer" htmlFor="customer" />
      <Select className={`w-full ${className}`} id="customer" {...rest}>
        <Select.Option value="" title="Choose One Of Customers" />
        {customers.length >= 1 &&
          customers.map((el, i) => (
            <Select.Option
              key={i}
              title={el.UserFullname}
              value={el.UserFullname}
              data-email={el.UserEmail}
            />
          ))}
        {customers.length < 1 && (
          <Select.Option value="" title="No Customers" />
        )}
      </Select>
    </>
  );
};

export default SelectCustomer;
