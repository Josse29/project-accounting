import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, ButtonIcon, Card, Loading } from "../../components";
import {
  FaFileExcel,
  FaFilePdf,
  FaMoneyCheckDollar,
  FaSquareMinus,
  FaSquarePlus,
} from "react-icons/fa6";
import TableAccounting from "./TableAccounting";
import PaginationAccounting from "./PaginationAccounting";
import ModalCreateAccounting from "./ModalCreateAccounting";
import ModalCreateAccounting1 from "./ModalCreateAccounting1";
import ModalCreateAccounting2 from "./ModalCreateAccounting2";
import ModaCsvAccounting from "./ModaCsvAccounting";
import ModalPdfAccounting from "./ModalPdfAccounting";
import SearchLimitAccounting from "./SearchLimitAccounting";
import { getAccounting, getAccounting2 } from "../../utils";

const CardAccounting = () => {
  const [accounting, setAccounting] = useState([]);
  const [headerTxt, setHeaderText] = useState("Cash");
  const [selectedAccount, setSelectedAccount] = useState("111");
  const [req, setReq] = useState({
    selectedAccount,
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const accounts = [
    { Id: "111", Label: "Cash" },
    { Id: "112", Label: "Receivable" },
    { Id: "113", Label: "Assets" },
    { Id: "211", Label: "Liability" },
    { Id: "311", Label: "Equity" },
    { Id: "411", Label: "Sales" },
    { Id: "511", Label: "Purchase" },
    { Id: "514", Label: "Expense Others" },
    { Id: "611", Label: "Revenue Others" },
  ];
  const [openCashIn, setOpenCashIn] = useState(false);
  const [openCashOut, setOpenCashOut] = useState(false);
  const [openEtc, setOpenEtc] = useState(false);
  const [openCsv, setOpenCsv] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    const params = { req, setAccounting, setTotalRows, setTotalPages };
    getAccounting(params);
  }, []);
  const accountTimeout = useRef(null);
  const handleAccount = async (acc) => {
    setHasTyped(false);
    setLoading(true);
    setReq((prev) => ({
      ...prev,
      selectedAccount: acc.Id,
      searchVal: "",
      offsetVal: 1,
    }));
    const newReq = {
      selectedAccount: acc.Id,
      searchVal: "",
      offsetVal: 1,
      limitVal: 10,
    };
    clearTimeout(accountTimeout.current);
    accountTimeout.current = setTimeout(async () => {
      await getAccounting2({
        req: newReq,
        setAccounting,
        setTotalRows,
        setTotalPages,
        setLoading,
      });
    }, 1000);
    setSelectedAccount(acc.Id);
    setHeaderText(acc.Label);
    return () => clearTimeout(searchTimeout.current);
  };
  return (
    <Card className="mb-10">
      <Card.Header headerTitle={headerTxt} className="bg-[#612bde]" />
      <Card.Body>
        {/* cash-in, cash-out , etc*/}
        <div className="flex  justify-end gap-3 mb-4">
          <ButtonIcon
            title="Cash In"
            icon={<FaSquarePlus />}
            className="bg-[#119687] hover:bg-[#0e8476] hover:ring-[#0e8476]"
            onClick={() => setOpenCashIn(true)}
          />
          <ButtonIcon
            title="Cash Out"
            icon={<FaSquareMinus />}
            className="bg-[#e11d48] hover:bg-[#cf163e] hover:ring-[#cf163e]"
            onClick={() => setOpenCashOut(true)}
          />
          <ButtonIcon
            title="Etc"
            icon={<FaMoneyCheckDollar />}
            className="bg-[#3c50e0] hover:bg-[#1f2d9c] hover:ring-[#1f2d9c]"
            onClick={() => setOpenEtc(true)}
          />
        </div>
        {/* convert excel, pdf */}
        <div className="flex justify-end gap-3 mb-4">
          {/* csv*/}
          <ButtonIcon
            title="Excel"
            icon={<FaFileExcel />}
            className="bg-green-600 hover:bg-green-700 hover:ring-green-700"
            onClick={() => setOpenCsv(true)}
          />
          {/* pdf */}
          <ButtonIcon
            title="PDF"
            icon={<FaFilePdf />}
            className="bg-red-500 hover:bg-red-600 hover:ring-red-600"
            onClick={() => setOpenPdf(true)}
          />
        </div>
        {/*  button mode */}
        <div className="flex gap-2 mb-4">
          {accounts.map((acc) => (
            <Button
              key={acc.Id}
              title={acc.Label}
              onClick={() => handleAccount(acc)}
              className={`${
                selectedAccount === acc.Id
                  ? "bg-[#612bde] border-2 border-white ring-2 ring-violet-500"
                  : "bg-[#8e6cdf]"
              } hover:ring-[#5024b8] hover:bg-[#612bde]`}
            />
          ))}
        </div>
        {/* search */}
        <div className="flex gap-2 mb-4">
          <SearchLimitAccounting
            req={req}
            setReq={setReq}
            accounting={accounting}
            setTotalRows={setTotalRows}
            setTotalPages={setTotalPages}
            setAccounting={setAccounting}
            setLoading={setLoading}
            hasTyped={hasTyped}
            setHasTyped={setHasTyped}
          />
        </div>
        {/* alert  */}
        <Alert.Success successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
        {/* loading */}
        {loading && <Loading />}
        {/* table */}
        {!loading && (
          <div className="flex gap-2 mb-4">
            <TableAccounting accounting={accounting} totalRows={totalRows} />
          </div>
        )}
        {/* pagination */}
        {!loading && (
          <div className="flex justify-center w-full mb-4">
            <PaginationAccounting
              setAccounting={setAccounting}
              req={req}
              setReq={setReq}
              totalRows={totalRows}
              totalPages={totalPages}
            />
          </div>
        )}
      </Card.Body>
      {/* modal */}
      <ModalCreateAccounting
        openCashIn={openCashIn}
        setOpenCashIn={setOpenCashIn}
        setSuccessMsg={setSuccessMsg}
        setReq={setReq}
        setAccounting={setAccounting}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
      <ModalCreateAccounting1
        openCashOut={openCashOut}
        setOpenCashOut={setOpenCashOut}
        setSuccessMsg={setSuccessMsg}
        setReq={setReq}
        setAccounting={setAccounting}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
      <ModalCreateAccounting2
        openEtc={openEtc}
        setOpenEtc={setOpenEtc}
        setSuccessMsg={setSuccessMsg}
        setReq={setReq}
        setAccounting={setAccounting}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
      <ModaCsvAccounting
        openCsv={openCsv}
        setOpenCsv={setOpenCsv}
        setSuccessMsg={setSuccessMsg}
      />
      <ModalPdfAccounting
        openPdf={openPdf}
        setOpenPdf={setOpenPdf}
        setSuccessMsg={setSuccessMsg}
      />
    </Card>
  );
};

export default CardAccounting;
