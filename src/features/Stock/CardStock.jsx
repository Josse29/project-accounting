import React, { useEffect, useState } from "react";
import { Alert, Button1, Card, Loading } from "../../components";
import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import SearchLimitStock from "./SearchLimitStock";
import TableStock from "./TableStock";
import ModalCsvStock from "./ModalCsvStock";
import ModalPdfStock from "./ModalPdfStock";
import PaginationStock from "./PaginationStock";
import { getStock } from "../../utils";

const CardStock = () => {
  const [req, setReq] = useState({
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  });
  const [stock, setStock] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [openCsv, setOpenCsv] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    getStock({
      req,
      setStock,
      setTotalRows,
      setTotalPages,
    });
  }, []);
  return (
    <Card>
      <Card.Header className="bg-[#3b82f6]" headerTitle="Stock" />
      <Card.Body>
        {/* create, csv, pdf */}
        <div className="flex gap-1 mb-4">
          {/* csv */}
          <Button1
            title="File-Excel"
            icon={<FaFileExcel className="text-2xl text-white" />}
            className="bg-green-500 hover:bg-green-600 hover:ring-green-300"
            onClick={() => setOpenCsv(true)}
          />
          {/* pdf */}
          <Button1
            title="File-PDF"
            icon={<FaFilePdf className="text-2xl text-white" />}
            className="bg-orange-500 hover:bg-orange-600 hover:ring-orange-300"
            onClick={() => setOpenPdf(true)}
          />
        </div>
        {/* search */}
        <div className="flex gap-3 mb-4">
          <SearchLimitStock
            req={req}
            setReq={setReq}
            setStock={setStock}
            setLoading={setLoading}
            setTotalRows={setTotalRows}
            setTotalPages={setTotalPages}
          />
        </div>
        {/* loading */}
        {loading && <Loading />}
        {/* alert */}
        <Alert.Success successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
        {/* table */}
        {!loading && (
          <div className="pb-3 mb-1 overflow-x-auto">
            <TableStock stock={stock} totalRows={totalRows} />
          </div>
        )}
        {/* pagination */}
        {!loading && (
          <div className="mb-4 flex justify-center">
            <PaginationStock
              totalPages={totalPages}
              totalRows={totalRows}
              req={req}
              setReq={setReq}
              setStock={setStock}
            />
          </div>
        )}
      </Card.Body>
      {/* modal */}
      <ModalCsvStock
        openCsv={openCsv}
        setOpenCsv={setOpenCsv}
        setSuccessMsg={setSuccessMsg}
      />
      <ModalPdfStock
        openPdf={openPdf}
        setOpenPdf={setOpenPdf}
        setSuccessMsg={setSuccessMsg}
      />
    </Card>
  );
};

export default CardStock;
