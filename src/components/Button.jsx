import React from "react";

const Button = (props) => {
  const { title, className, ...rest } = props;
  return (
    <button
      className={`text-white py-2 px-3 rounded-md text-xl hover:ring-2 hover:border-2 hover:border-white ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
