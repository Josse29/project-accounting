import React from "react";
import Table from "../../components/Table";
import { Badge } from "../../components";
import { formatCurrency2, formatDate } from "../../utils";

const TableAccounting = (props) => {
  const { accounting, totalRows } = props;
  return (
    <Table>
      <Table.HeadRow>
        <Table.HeadCol title="#" className="w-[80px]" />
        <Table.HeadCol title="Date" className="w-[200px] text-start" />
        <Table.HeadCol title="Time" className="w-[90px]" />
        <Table.HeadCol title="Name" className="w-[280px] text-start" />
        <Table.HeadCol title="Balance" className="w-[250px]" />
      </Table.HeadRow>
      <Table.Body>
        {totalRows >= 1 &&
          accounting.map((el, i) => (
            <Table.BodyRow
              key={i}
              className={`${(i + 1) % 2 !== 0 ? "bg-[#dddddd]" : ""}`}
            >
              <Table.BodyCol title={el.AccountingId} className="text-center" />
              <Table.BodyCol title={formatDate(el.AccountingDate)} />
              <Table.BodyCol
                title={el.AccountingTime}
                className="text-center"
              />
              <Table.BodyCol title={el.AccountingName} />
              <Table.BodyCol
                title={
                  <Badge
                    title={formatCurrency2(el.AccountingBalance)}
                    className={`${
                      el.AccountingBalance >= 1 ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                }
                className="text-center"
              />
            </Table.BodyRow>
          ))}
        {totalRows < 1 && (
          <Table.BodyRow>
            <Table.BodyCol
              title="Accounting is Empty"
              colSpan="5"
              className="font-bold italic text-center bg-[#dddddd]"
            />
          </Table.BodyRow>
        )}
      </Table.Body>
    </Table>
  );
};

export default TableAccounting;
