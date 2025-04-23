import React from "react";

const CardImg = ({ children }) => {
  return <div className="shadow-lg rounded-b-lg">{children}</div>;
};
const HeaderImg = (props) => {
  const { imgSrc, alt } = props;
  return (
    <img src={imgSrc} alt={alt} className="rounded-t-lg h-[200px] w-full" />
  );
};
const Body = ({ children }) => {
  return <div className="rounded-b-lg p-4">{children}</div>;
};

CardImg.HeaderImg = HeaderImg;
CardImg.Body = Body;

export default CardImg;
