import React from "react";

const TextArea = (props) => {
  const { title, htmlFor1, className, ...rest } = props;
  return (
    <>
      <label htmlFor={htmlFor1} className="text-2xl block mb-2">
        {title}
      </label>
      <textarea
        id={htmlFor1}
        type="text"
        className={`w-full border-slate-300 rounded-md focus:border-0 focus:ring-2 placeholder:text-slate-400 ${className}`}
        {...rest}
      />
    </>
  );
};

export default TextArea;
