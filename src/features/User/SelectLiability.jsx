import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getLiability1API } from "../../services";
import { formatCurrency1 } from "../../utils";

const SelectLiability = (props) => {
  const { className, ...rest } = props;
  const [liability, setliability] = useState([]);
  const getLiability = async () => {
    try {
      const response = await getLiability1API();
      setliability(response);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getLiability();
  }, []);
  return (
    <>
      <Select.Label title="Liability" htmlFor="liability" />
      <Select className={`w-full ${className}`} id="liability" {...rest}>
        <Select.Option value="" title="Choose One Of Liabilities" />
        {liability.length >= 1 &&
          liability.map((el, i) => (
            <Select.Option
              key={i}
              value={el.UserFullname}
              title={`${el.UserFullname} - ${formatCurrency1(el.LiabilitySum)}`}
              data-email={el.UserEmail}
            />
          ))}
        {liability.length < 1 && (
          <Select.Option value="" title="Liabilities is Empty..." />
        )}
      </Select>
    </>
  );
};

export default SelectLiability;
