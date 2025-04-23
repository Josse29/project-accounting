import React, { useEffect, useState } from "react";
import { Alert, Button1, Card, Loading } from "../../components";
import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import SearchLimitSale from "./SearchLimitSale";
import TableSale from "./TableSale";
import ModalCsvSale from "./ModalCsvSale";
import ModalPdfSale from "./ModalPdfSale";
import PaginationSale from "./PaginationSale";
import { getSale } from "../../utils";

const CardSale = () => {
  const [openCsv, setOpenCsv] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [sale, setSale] = useState([]);
  const [req, setReq] = useState({
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const params = { req, setSale, setTotalRows, setTotalPages };
    getSale(params);
  }, []);
  return (
    <Card>
      <Card.Header className="bg-[#273eec]" headerTitle="Sale" />
      <Card.Body>
        {/* csv, pdf */}
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
        {/* search limit */}
        <div className="flex gap-3 mb-4">
          <SearchLimitSale
            req={req}
            setReq={setReq}
            setSale={setSale}
            setTotalRows={setTotalRows}
            setTotalPages={setTotalPages}
            setLoading={setLoading}
          />
        </div>
        {/* loading */}
        {loading && <Loading />}
        {/* alert */}
        <Alert.Success successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
        {/* table */}
        {!loading && (
          <div className="pb-3 mb-1 overflow-x-auto">
            <TableSale sale={sale} totalRows={totalRows} />
          </div>
        )}
        {/* pagination */}
        {!loading && (
          <div className="mb-4 flex justify-center">
            <PaginationSale
              req={req}
              setReq={setReq}
              totalPages={totalPages}
              totalRows={totalRows}
              setSale={setSale}
            />
          </div>
        )}
      </Card.Body>
      {/* modal */}
      <ModalCsvSale
        openCsv={openCsv}
        setOpenCsv={setOpenCsv}
        setSuccessMsg={setSuccessMsg}
      />
      <ModalPdfSale
        openPdf={openPdf}
        setOpenPdf={setOpenPdf}
        setSuccessMsg={setSuccessMsg}
      />
    </Card>
  );
};

export default CardSale;
