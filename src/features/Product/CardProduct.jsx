import React, { useEffect, useState } from "react";
import { Alert, Button1, Card, Loading } from "../../components";
import { FaFileExcel, FaFilePdf, FaFolderPlus } from "react-icons/fa6";
import SearchLimitProduct from "./SearchLimitProduct";
import TableProduct from "./TableProduct";
import ModalCreateProduct from "./ModalCreateProduct";
import PaginationProduct from "./PaginationProduct";
import { convertCSV, convertPDF, getProduct, uiProductPdf } from "../../utils";
import { getProductCSVAPI, getProductPDFAPI } from "../../services/product";

const CardProduct = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [req, setReq] = useState({
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  });
  useEffect(() => {
    getProduct({
      req,
      setLoading,
      setProduct,
      setTotalRows,
      setTotalPages,
    });
  }, []);
  const handleCSV = async () => {
    setLoading1(true);
    try {
      const products = await getProductCSVAPI();
      const args = {
        data: products,
        setSuccessMsg,
        setErrMsg,
      };
      await convertCSV(args);
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      throw error;
    } finally {
      setLoading1(false);
    }
  };
  const handlePDF = async () => {
    setLoading2(true);
    try {
      const products = await getProductPDFAPI();
      const htmlContent = uiProductPdf(products);
      const args = {
        htmlContent,
        setSuccessMsg,
        setErrMsg,
      };
      await convertPDF(args);
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      throw error;
    } finally {
      setLoading2(false);
    }
  };
  return (
    <Card>
      <Card.Header className="bg-[#3b82f6]" headerTitle="Product" />
      <Card.Body>
        {/* create, csv, pdf */}
        <div className="flex gap-1 mb-4">
          {/* create */}
          <Button1
            title="Add Product"
            className="bg-[#3b82f6] hover:bg-sky-700 hover:ring-sky-300"
            icon={<FaFolderPlus className="text-2xl text-white" />}
            onClick={() => setOpenCreate(true)}
          />
          {/* csv */}
          <Button1
            title="File Excel"
            disabled={loading1 ? true : false}
            className={`${
              loading1 ? "cursor-not-allowed bg-opacity-60" : "cursor-pointer"
            }
              bg-green-500 hover:bg-green-600 hover:ring-green-300`}
            icon={<FaFileExcel className="text-2xl text-white" />}
            onClick={handleCSV}
          />
          {/* pdf */}
          <Button1
            title="File PDF"
            disabled={loading2 ? true : false}
            className={`${
              loading2 ? "cursor-not-allowed bg-opacity-60" : "cursor-pointer"
            } bg-orange-500 hover:bg-orange-600 hover:ring-orange-300`}
            icon={<FaFilePdf className="text-2xl text-white" />}
            onClick={handlePDF}
          />
        </div>
        {/* search limit product */}
        <div className="flex gap-3 mb-4">
          <SearchLimitProduct
            setProduct={setProduct}
            setReq={setReq}
            req={req}
            setTotalRows={setTotalRows}
            setTotalPages={setTotalPages}
            setLoading={setLoading}
          />
        </div>
        {/* loading */}
        {loading && <Loading />}
        {/* alert */}
        <>
          <Alert.Success
            successMsg={successMsg}
            setSuccessMsg={setSuccessMsg}
          />
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
        </>
        {/* table product */}
        {!loading && (
          <div className="mb-4">
            <TableProduct
              product={product}
              totalRows={totalRows}
              setSuccessMsg={setSuccessMsg}
              setProduct={setProduct}
              setTotalPages={setTotalPages}
              setTotalRows={setTotalRows}
              setReq={setReq}
            />
          </div>
        )}
        {/* pagination */}
        {!loading && (
          <div className="mb-4 flex justify-center">
            <PaginationProduct
              req={req}
              setReq={setReq}
              totalPages={totalPages}
              totalRows={totalRows}
              setProduct={setProduct}
              setLoading={setLoading}
            />
          </div>
        )}
      </Card.Body>
      {/* modal */}
      <ModalCreateProduct
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        setSuccessMsg={setSuccessMsg}
        setProduct={setProduct}
        setReq={setReq}
        setTotalPages={setTotalPages}
        setTotalRows={setTotalRows}
      />
    </Card>
  );
};

export default CardProduct;
