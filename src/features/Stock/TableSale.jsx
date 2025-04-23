import React from "react";
import { Badge, Table } from "../../components";
import {
  formatCurrency1,
  formatCurrency2,
  formatDate,
  formatQty,
} from "../../utils";

const TableSale = (props) => {
  const { sale, totalRows } = props;
  return (
    <>
      <Table>
        <Table.HeadRow>
          <Table.HeadCol title="#" className="w-[80px]" />
          <Table.HeadCol title="Day" className="w-[240px] text-start" />
          <Table.HeadCol title="Time" className="w-[80px]" />
          <Table.HeadCol title="Sale Name" className="w-[180px] text-start" />
          <Table.HeadCol
            title="Product Name"
            className="w-[190px] text-start"
          />
          <Table.HeadCol
            title="Product Price"
            className="w-[200px] text-start"
          />
          <Table.HeadCol title="Qty" className="w-[90px]" />
          <Table.HeadCol title="Total" className="w-[220px]" />
          <Table.HeadCol
            title="Customer Name"
            className="w-[180px] text-start"
          />
        </Table.HeadRow>
        <Table.Body>
          {totalRows >= 1 &&
            sale.map((el, i) => (
              <Table.BodyRow
                key={el.SaleId}
                className={`${(i + 1) % 2 !== 0 ? "bg-[#dddddd]" : ""}`}
              >
                <Table.BodyCol title={el.SaleId} className="text-center" />
                <Table.BodyCol title={formatDate(el.SaleDate)} />
                <Table.BodyCol title={el.SaleTime} />
                <Table.BodyCol title={el.SaleName} />
                <Table.BodyCol title={el.ProductName} />
                <Table.BodyCol title={formatCurrency1(el.ProductPriceSell)} />
                <Table.BodyCol
                  title={
                    <Badge
                      title={formatQty(el.SaleQty)}
                      className={`${
                        el.SaleQty >= 1 ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                  }
                />
                <Table.BodyCol
                  title={
                    <Badge
                      title={formatCurrency2(el.SaleBalance)}
                      className={`${
                        el.SaleBalance >= 1 ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                  }
                />
                <Table.BodyCol title={el.CustomerName} />
              </Table.BodyRow>
            ))}
          {totalRows < 1 && (
            <Table.BodyRow>
              <Table.BodyCol
                title="Sale is Empty"
                colSpan="9"
                className="font-bold italic text-center bg-[#dddddd]"
              />
            </Table.BodyRow>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default TableSale;
