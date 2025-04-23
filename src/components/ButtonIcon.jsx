import React from "react";

const ButtonIcon = (props) => {
  const { title, icon, className, ...rest } = props;
  return (
    <button
      className={`flex items-center gap-3 py-2 px-3 rounded-md hover:border-2 hover:border-white hover:ring-2 ${className} text-white text-2xl`}
      {...rest}
    >
      {icon}
      <div className="text-xl">{title}</div>
    </button>
  );
};

export default ButtonIcon;
