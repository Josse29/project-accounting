import React from "react";

const Badge = (props) => {
  const { title, className } = props;
  return (
    <div
      className={`max-w-fit mx-auto font-bold ${className} text-white truncate px-2 py-1 rounded-md text-center hover:text-wrap`}
    >
      {title}
    </div>
  );
};

export default Badge;
