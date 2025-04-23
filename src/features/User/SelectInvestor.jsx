import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getInvestorAPI } from "../../services";
import { formatCurrency1 } from "../../utils";

const SelectInvestor = (props) => {
  const { className, setLoading, ...rest } = props;
  const [investor, setInvestor] = useState([]);
  const getInvestor = async () => {
    setLoading(true);
    try {
      const investors = await getInvestorAPI();
      setInvestor(investors);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInvestor();
  }, []);
  return (
    <>
      <Select.Label title="Investor" htmlFor="investor" />
      <Select className={`w-full ${className}`} id="investor" {...rest}>
        <Select.Option title="Choose One Of Investors" value="" />
        {investor.length >= 1 &&
          investor.map((el, i) => (
            <Select.Option
              key={i}
              value={el.UserFullname}
              title={`${el.UserFullname} - ${formatCurrency1(el.TotalEquity)}`}
              data-userfullname={el.UserFullname}
              data-useremail={el.UserEmail}
              data-totalequity={el.TotalEquity}
            />
          ))}
        {investor.length < 1 && (
          <>
            <Select.Option
              value=""
              title="Investor is Empty..."
              className="text-center italic"
            />
          </>
        )}
      </Select>
    </>
  );
};

export default SelectInvestor;
