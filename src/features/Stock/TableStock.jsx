import React from "react";
import { Badge, Table } from "../../components";
import {
  formatCurrency1,
  formatCurrency2,
  formatDate,
  formatQty,
} from "../../utils";
const TableStock = (props) => {
  const { stock, totalRows } = props;
  return (
    <>
      <Table>
        <Table.HeadRow>
          <Table.HeadCol title="#" className="w-[80px]" />
          <Table.HeadCol title="Day" className="w-[200px] text-start" />
          <Table.HeadCol title="Time" className="w-[85px]" />
          <Table.HeadCol
            title="Product Name"
            className="w-[185px] text-start"
          />
          <Table.HeadCol
            title="Product Price"
            className="w-[185px] text-start"
          />
          <Table.HeadCol title="Qty" className="w-[85px]" />
          <Table.HeadCol title="Total" className="w-[190px]" />
        </Table.HeadRow>
        <Table.Body>
          {totalRows >= 1 &&
            stock.map((el, i) => (
              <Table.BodyRow
                key={el.StockId}
                className={`${(i + 1) % 2 !== 0 ? "bg-[#dddddd]" : ""}`}
              >
                <Table.BodyCol title={el.StockId} className="text-center" />
                <Table.BodyCol title={formatDate(el.StockDate)} />
                <Table.BodyCol title={el.StockTime} className="text-center" />
                <Table.BodyCol title={el.ProductName} />
                <Table.BodyCol title={formatCurrency1(el.ProductPriceBuy)} />
                <Table.BodyCol
                  title={
                    <Badge
                      title={formatQty(el.StockQty)}
                      className={`${
                        el.StockQty >= 1 ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                  }
                  className="text-center"
                />
                <Table.BodyCol
                  title={
                    <Badge
                      title={formatCurrency2(el.StockBalance)}
                      className={`${
                        el.StockBalance >= 1 ? "bg-green-600" : "bg-red-600"
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
                title="Stock is Empty"
                colSpan="7"
                className="font-bold italic text-center bg-[#dddddd]"
              />
            </Table.BodyRow>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default TableStock;
