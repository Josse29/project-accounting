import React from "react";

const Card = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={`bg-white border-2 border-slate-200 rounded-b-2xl ${className}`}
    >
      {children}
    </div>
  );
};
const Header = (props) => {
  const { className, headerTitle } = props;
  return (
    <div className={`${className} p-3`}>
      <div className="text-3xl text-white">{headerTitle}</div>
    </div>
  );
};
const Body = ({ children }) => {
  return <div className="p-4 rounded-b-2xl overflow-x-auto ">{children}</div>;
};
Card.Header = Header;
Card.Body = Body;
export default Card;
