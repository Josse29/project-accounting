import React from "react";
import { formatCurrency } from "../utils";

const InputBalance = (props) => {
  const { title, htmlFor1, className, setFormData, ...rest } = props;
  const handleInput = (e) => {
    const { name, value } = e.target;
    const formatted = formatCurrency(value);
    setFormData((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };
  return (
    <>
      <label htmlFor={htmlFor1} className="text-2xl block mb-2">
        {title}
      </label>
      <input
        id={htmlFor1}
        type="text"
        className={`w-full border-slate-300 rounded-md focus:border-0 focus:ring-2 placeholder:text-slate-400 ${className}`}
        placeholder="ex : $ 10.00 "
        onInput={handleInput}
        {...rest}
      />
    </>
  );
};

export default InputBalance;
