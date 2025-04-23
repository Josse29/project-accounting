import React, { useEffect, useState } from "react";
import {
  formatCurrency1,
  getStorageCart,
  getStorageCartSum,
} from "../../utils";
import { Table } from "../../components";

const TableOrder = () => {
  const [carts, setCarts] = useState([]);
  const [cartSum, setCartSum] = useState({ qty: 0, balance: 0 });
  useEffect(() => {
    const cart = getStorageCart();
    setCarts(cart || []);
    const storageCartSum = getStorageCartSum();
    setCartSum({
      qty: storageCartSum.totalQty || 0,
      balance: storageCartSum.totalBalance || 0,
    });
  }, []);
  return (
    <>
      <Table>
        <Table.HeadRow>
          <Table.HeadCol title="No" className="w-[50px]" />
          <Table.HeadCol title="Product" className="w-[180px] text-start" />
          <Table.HeadCol title="Price" className="w-[200px] text-start" />
          <Table.HeadCol title="Qty" className="w-[50px]" />
          <Table.HeadCol title="Total" className="w-[230px]" />
        </Table.HeadRow>
        <Table.Body>
          {carts.length >= 1 &&
            carts.map((el, i) => (
              <Table.BodyRow
                key={el.ProductId}
                className={`${(i + 1) % 2 !== 0 ? "bg-[#dddddd]" : ""}`}
              >
                <Table.BodyCol title={i + 1} className="text-center" />
                <Table.BodyCol title={el.ProductName} />
                <Table.BodyCol title={formatCurrency1(el.PriceSell)} />
                <Table.BodyCol title={el.ProductQty} className="text-center" />
                <Table.BodyCol
                  title={formatCurrency1(
                    parseFloat(el.PriceSell) * el.ProductQty
                  )}
                />
              </Table.BodyRow>
            ))}
          {carts.length < 1 && (
            <Table.BodyRow className="bg-[#dddddd]">
              <Table.BodyCol
                title="No Data"
                className="text-center"
                colSpan="5"
              />
            </Table.BodyRow>
          )}
        </Table.Body>
        <Table.FootRow>
          <Table.FootCol title="Total" className="text-center" colSpan="3" />
          <Table.FootCol title={cartSum.qty} className="text-center" />
          <Table.FootCol
            title={formatCurrency1(cartSum.balance)}
            className="text-left"
          />
        </Table.FootRow>
      </Table>
    </>
  );
};

export default TableOrder;
