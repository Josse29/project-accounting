import React from "react";

const Table = ({ children }) => {
  return <table className="text-[17px] w-full table-fixed">{children}</table>;
};
const HeadRow = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};
const HeadCol = (props) => {
  const { className, title } = props;
  return <th className={`px-4 py-2 ${className}`}>{title}</th>;
};
const Body = ({ children }) => {
  return <tbody>{children}</tbody>;
};
const BodyRow = (props) => {
  const { className, children } = props;
  return <tr className={`${className}`}>{children}</tr>;
};
const BodyCol = (props) => {
  const { className, title, ...rest } = props;
  return (
    <td
      className={`px-4 py-2 ${className} overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible hover:break-words`}
      {...rest}
    >
      {title}
    </td>
  );
};
const FootRow = ({ children }) => {
  return (
    <tfoot>
      <tr>{children}</tr>
    </tfoot>
  );
};
const FootCol = (props) => {
  const { className, title, ...rest } = props;
  return (
    <th
      className={`px-4 py-2 ${className} overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible hover:break-words`}
      {...rest}
    >
      {title}
    </th>
  );
};
Table.HeadRow = HeadRow;
Table.HeadCol = HeadCol;
Table.Body = Body;
Table.BodyRow = BodyRow;
Table.BodyCol = BodyCol;
Table.FootRow = FootRow;
Table.FootCol = FootCol;
export default Table;
