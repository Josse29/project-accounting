import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getSaleAPI } from "../../services";

const SelectSale = (props) => {
  const { className, setLoading, ...rest } = props;
  const [sale, setSale] = useState([]);
  const getSale = async () => {
    try {
      setLoading(true);
      const response = await getSaleAPI();
      setSale(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSale();
  }, []);
  return (
    <>
      <Select.Label title="Sale" htmlFor="sale-name" />
      <Select className={`w-full ${className}`} id="sale-name" {...rest}>
        <Select.Option value="" title="Choose One Of Sales" />
        {sale.length >= 1 &&
          sale.map((el, i) => (
            <Select.Option
              key={i}
              value={el.UserFullname}
              title={el.UserFullname}
            />
          ))}
        {sale.length < 1 && (
          <Select.Option
            value=""
            title="No sales"
            className="text-center italic"
          />
        )}
      </Select>
    </>
  );
};

export default SelectSale;
