import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getSupplierAPI } from "../../services";

const SelectSupplier = (props) => {
  const { htmlForId, className, ...rest } = props;
  const [supplier, setSupplier] = useState([]);
  const getSupplier = async () => {
    try {
      const response = await getSupplierAPI();
      setSupplier(response);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getSupplier();
  }, []);
  return (
    <>
      <Select.Label title="Supplier" htmlFor={htmlForId} />
      <Select className={`w-full ${className}`} id={htmlForId} {...rest}>
        <Select.Option title="Choose One Of Suppliers" value="null" />
        {supplier.length >= 1 &&
          supplier.map((el) => (
            <Select.Option
              key={el.UserId}
              title={el.UserFullname}
              value={el.UserId}
            />
          ))}
        {supplier.length < 1 && (
          <Select.Option
            title="Supplier is empty..."
            className="text-center"
            value="null"
          />
        )}
      </Select>
    </>
  );
};

export default SelectSupplier;
