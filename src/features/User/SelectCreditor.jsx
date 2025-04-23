import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getCreditorAPI } from "../../services";
import { formatCurrency1 } from "../../utils";

const SelectCreditor = (props) => {
  const { className, ...rest } = props;
  const [creditor, setCreditor] = useState([]);
  const getCreditor = async () => {
    try {
      const response = await getCreditorAPI();
      setCreditor(response);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getCreditor();
  }, []);
  return (
    <>
      <Select.Label title="Creditor" htmlFor="creditor" />
      <Select className={`w-full ${className}`} id="creditor" {...rest}>
        <Select.Option value="" title="Choose One Of Creditor" />
        {creditor.length >= 1 &&
          creditor.map((el, i) => (
            <Select.Option
              key={i}
              value={el.UserFullname}
              title={`${el.UserFullname} - ${formatCurrency1(
                el.TotalLiability
              )}`}
              data-email={el.UserEmail}
            />
          ))}
        {creditor.length < 1 && (
          <Select.Option value="" title="Creditor is Empty..." />
        )}
      </Select>
    </>
  );
};

export default SelectCreditor;
