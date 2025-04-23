import React from "react";

const InputBtn = ({ children }) => {
  return <div className="flex">{children}</div>;
};
const Input = (props) => {
  const { className, ...rest } = props;
  return (
    <input
      type="text"
      className={`border-slate-300 focus:ring-2 placeholder:text-lg ${className}`}
      {...rest}
    />
  );
};
const Button = (props) => {
  const { title, className } = props;
  return (
    <button className={`px-3 text-white rounded-e-lg ${className}`}>
      {title}
    </button>
  );
};

InputBtn.Input = Input;
InputBtn.Btn = Button;
export default InputBtn;
