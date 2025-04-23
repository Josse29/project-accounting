import React from "react";
import { formatPercentage, formatPercentage1 } from "../utils";

const InputPercent = (props) => {
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
    <div className="flex justify-between items-center">
      <label className="text-xl" htmlFor={htmlForId}>
        {title}
      </label>
      <input
        type="text"
        className={`${className} text-xl border-none focus:ring-2 focus:border-none rounded-sm text-center py-1 px-2`}
        id={htmlForId}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="0%"
        {...rest}
      />
    </div>
  );
};

export default InputPercent;
