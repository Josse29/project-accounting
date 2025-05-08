import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getReceivableAPI } from "../../services";
import { formatCurrency1 } from "../../utils";

const SelectReceivable = (props) => {
  const { className, setLoading, ...rest } = props;
  const [receive, setReceive] = useState([]);
  const getReceviable = async () => {
    try {
      setLoading(true);
      const response = await getReceivableAPI();
      setReceive(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getReceviable();
  }, []);
  return (
    <>
      <Select.Label title="Receivable" htmlFor="receive" />
      <Select id="receive" className={`${className} w-full`} {...rest}>
        <Select.Option title="Choose One of Receivable" value="" />
        {receive.length >= 1 &&
          receive.map((el, i) => (
            <Select.Option
              key={i}
              title={`${el.UserFullname} : ${formatCurrency1(
                el.TotalReceivable
              )}`}
              value={el.UserFullname}
              data-email={el.UserEmail}
            />
          ))}
        {receive.length < 1 && (
          <Select.Option
            title="No Receivable Available"
            value=""
            className="text-center italic"
          />
        )}
      </Select>
    </>
  );
};

export default SelectReceivable;
