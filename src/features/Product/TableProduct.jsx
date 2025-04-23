import React, { useEffect, useState } from "react";
import { ButtonAction, Table } from "../../components";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDetailProduct from "./ModalDetailProduct";
import { formatCurrency1 } from "../../utils/formatCurrency";

const TableProduct = (props) => {
  const {
    product,
    setSuccessMsg,
    setProduct,
    totalRows,
    setReq,
    setTotalRows,
    setTotalPages,
  } = props;
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [productData, setproductData] = useState({});
  return (
    <>
      <Table>
        <Table.HeadRow>
          <Table.HeadCol className="w-[80px] text-center" title="#" />
          <Table.HeadCol
            className="w-[170px] text-start"
            title="Product Name"
          />
          <Table.HeadCol className="w-[150px] text-start" title="Price Buy" />
          <Table.HeadCol className="w-[150px] text-start" title="Price Sell" />
          <Table.HeadCol className="w-[150px] text-start" title="Supplier" />
          <Table.HeadCol className="w-[250px]" title="Action" />
        </Table.HeadRow>
        <Table.Body>
          {totalRows >= 1 &&
            product.map((el, i) => (
              <Table.BodyRow
                key={el.ProductId}
                className={`${(i + 1) % 2 !== 0 ? "bg-[#dddddd]" : ""}`}
              >
                <Table.BodyCol className="text-center" title={el.ProductId} />
                <Table.BodyCol title={el.ProductName} />
                <Table.BodyCol title={formatCurrency1(el.ProductPriceBuy)} />
                <Table.BodyCol title={formatCurrency1(el.ProductPriceSell)} />
                <Table.BodyCol
                  className="capitalize"
                  title={el.SupplierName !== null ? el.SupplierName : "-"}
                />
                <Table.BodyCol
                  title={
                    <ButtonAction
                      btnDetail={() => {
                        setproductData(el);
                        setOpenDetail(true);
                      }}
                      btnUpdate={() => {
                        setproductData(el);
                        setOpenUpdate(true);
                      }}
                      btnDelete={() => {
                        setproductData(el);
                        setOpenDelete(true);
                      }}
                    />
                  }
                />
              </Table.BodyRow>
            ))}
          {totalRows < 1 && (
            <Table.BodyRow className="bg-[#dddddd]">
              <Table.BodyCol
                className="text-center font-bold capitalize italic"
                colSpan="6"
                title="Product is Empty"
              />
            </Table.BodyRow>
          )}
        </Table.Body>
      </Table>
      {/* modal */}
      <ModalDetailProduct
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={productData}
      />
      <ModalUpdateProduct
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={productData}
        setSuccessMsg={setSuccessMsg}
        setReq={setReq}
        setProduct={setProduct}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
      <ModalDeleteProduct
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        dataDelete={productData}
        setSuccessMsg={setSuccessMsg}
        setReq={setReq}
        setProduct={setProduct}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
    </>
  );
};

export default TableProduct;
