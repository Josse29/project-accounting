import React from "react";
const Label = (props) => {
  const { title, ...rest } = props;
  return (
    <label className="text-2xl block mb-2" {...rest}>
      {title}
    </label>
  );
};
const Option = (props) => {
  const { value, title, ...rest } = props;
  return (
    <option value={value} {...rest}>
      {title}
    </option>
  );
};
const Select = (props) => {
  const { children, className, ...rest } = props;
  return (
    <>
      <select
        className={`border-slate-300 focus:ring-2 rounded-lg ${className} capitalize focus:border-none`}
        {...rest}
      >
        {children}
      </select>
    </>
  );
};
Select.Label = Label;
Select.Option = Option;
export default Select;
