import React from "react";

const CardList = ({ children }) => {
  return <div className="rounded-b-2xl shadow-lg">{children}</div>;
};
const Header = (props) => {
  const { className, titleheader } = props;
  return (
    <div className={`${className} p-2`}>
      <div className="text-2xl text-white text-center">{titleheader}</div>
    </div>
  );
};
const Body = (props) => {
  const { titleBody, children } = props;
  return (
    <div className="bg-white rounded-b-2xl p-3">
      <div className="text-xl mb-3 font-bold text-end">{titleBody}</div>
      <div className="h-[335px] overflow-y-auto">{children}</div>
    </div>
  );
};
const List = (props) => {
  const { imgSrc, listName, listBalance } = props;
  return (
    <>
      <div className="flex gap-4">
        <img
          src={imgSrc}
          alt="person.jpg"
          className="h-[61px] w-[61px] rounded-full"
        />
        <div className="overflow-hidden">
          <div className="text-xl font-bold mb-1 truncate hover:text-wrap capitalize">
            {listName}
          </div>
          <div className="text-xl ps-2">{listBalance}</div>
        </div>
      </div>
      <div className="border-b-2 border-slate-300 my-3 mx-2"></div>
    </>
  );
};

CardList.Header = Header;
CardList.Body = Body;
CardList.List = List;

export default CardList;
