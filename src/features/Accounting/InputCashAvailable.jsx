import React, { useEffect, useState } from "react";
import { InputText } from "../../components";
import { formatCurrency1 } from "../../utils";
import { getCashAPI } from "../../services";

const InputCashAvailable = (props) => {
  const { setLoading } = props;
  const [cash, setCash] = useState(0);
  const getCash = async () => {
    setLoading(true);
    try {
      const response = await getCashAPI();
      setCash(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCash();
  }, []);
  return (
    <InputText
      title="Cash Available"
      htmlFor1="cash-available"
      className="focus:ring-red-500"
      value={formatCurrency1(cash)}
      disabled={true}
    />
  );
};

export default InputCashAvailable;
