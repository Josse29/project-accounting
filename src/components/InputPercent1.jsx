import React from "react";
import { formatPercentage, formatPercentage1 } from "../utils";

const InputPercent1 = (props) => {
  const { title, htmlForId, className, setFormData, ...rest } = props;
  const handleInput = (e) => {
    const { name, value } = e.target;
    const formatted = formatPercentage(value);
    setFormData((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const formatted = formatPercentage1(e);
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: formatted,
      }));
    }
  };
  return (
    <>
      <label className="text-2xl block mb-2" htmlFor={htmlForId}>
        {title}
      </label>
      <input
        type="text"
        className={`w-full border-slate-300 rounded-md focus:border-0 focus:ring-2 placeholder:text-slate-400 ${className} text-xl`}
        id={htmlForId}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="0%"
        {...rest}
      />
    </>
  );
};

export default InputPercent1;
