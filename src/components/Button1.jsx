import { Tooltip } from "flowbite-react";
import React from "react";

const Button1 = (props) => {
  const { title, className, icon, ...rest } = props;
  return (
    <button
      className={`text-white py-3 px-4 rounded-md text-xl hover:ring-2 hover:border-2 hover:border-white ${className}`}
      {...rest}
    >
      <Tooltip content={title} placement="bottom" className="text-sm">
        {icon}
      </Tooltip>
    </button>
  );
};

export default Button1;
