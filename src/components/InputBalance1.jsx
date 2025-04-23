import React from "react";
import { formatCurrency } from "../utils";

const InputBalance1 = (props) => {
  const { className, setFormData, ...rest } = props;
  const handleInput = (e) => {
    const { name, value } = e.target;
    const formatted = formatCurrency(value);
    setFormData((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };
  return (
    <input
      type="text"
      className={`p-0 border-0 border-b-2 border-slate-200 focus:ring-0 ${className} text-lg`}
      onInput={handleInput}
      {...rest}
    />
  );
};

export default InputBalance1;
