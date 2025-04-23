import React from "react";

const InputDate = (props) => {
  const { title, className, htmlForId, ...rest } = props;
  return (
    <>
      <label htmlFor={htmlForId} className="text-2xl block mb-2">
        {title}
      </label>
      <input
        id={htmlForId}
        type="date"
        className={`w-full border-slate-300 rounded-md focus:border-0 focus:ring-2 placeholder:text-slate-400 ${className}`}
        {...rest}
      />
    </>
  );
};
export default InputDate;
