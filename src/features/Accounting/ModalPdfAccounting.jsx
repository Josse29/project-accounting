import React, { useContext, useState } from "react";
import { Alert, Button, InputDate, Modal, Select } from "../../components";
import { FaFilePdf } from "react-icons/fa6";
import {
  getAccountingPDF1API,
  getAccountingPDF2API,
  getAccountingPDF3API,
  getAccountingPDF4API,
  getAccountingPDF5API,
  getAccountingPDF6API,
  getAccountingPDF7API,
  getAccountingPDF8API,
  getAccountingPDFAPI,
  getCompany1API,
  getFinancialStatement1API,
} from "../../services";
import {
  convertPDF,
  uiAccountingPDF,
  uiAccountingPDF1,
  uiAccountingPDF2,
  uiAccountingPDF3,
  uiAccountingPDF4,
  uiAccountingPDF5,
  uiAccountingPDF6,
  uiAccountingPDF7,
  uiAccountingPDF8,
  uiFinancialStatement,
} from "../../utils";

const ModalPdfAccounting = (props) => {
  const { openPdf, setOpenPdf, setSuccessMsg } = props;
  const [formData, setFormData] = useState({
    selectedAccount: "111",
    startDateVal: "",
    endDateVal: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // for company name
  const getCompanyName = async () => {
    try {
      const response = await getCompany1API();
      return response[0].CompanyName;
    } catch (error) {
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { selectedAccount, startDateVal, endDateVal } = formData;
      const req = {
        selectedAccount,
        startDateVal,
        endDateVal,
      };
      const companyName = await getCompanyName();
      if (selectedAccount === "111") {
        const response = await getAccountingPDFAPI(req);
        const htmlContent = uiAccountingPDF(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "112") {
        const response = await getAccountingPDF1API(req);
        const htmlContent = uiAccountingPDF1(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "113") {
        const response = await getAccountingPDF2API(req);
        const htmlContent = uiAccountingPDF2(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "211") {
        const response = await getAccountingPDF3API(req);
        const htmlContent = uiAccountingPDF3(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "311") {
        const response = await getAccountingPDF4API(req);
        const htmlContent = uiAccountingPDF4(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "411") {
        const response = await getAccountingPDF5API(req);
        const htmlContent = uiAccountingPDF5(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "511") {
        const response = await getAccountingPDF6API(req);
        const htmlContent = uiAccountingPDF6(response);
        await convertPDF({
          htmlContent,
          setSuccessMsg,
          setErrMsg,
          setOpenPdf,
        });
      }
      if (selectedAccount === "514") {
        const response = await getAccountingPDF7API(req);
        const htmlContent = uiAccountingPDF7(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "611") {
        const response = await getAccountingPDF8API(req);
        const htmlContent = uiAccountingPDF8(response, companyName);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      if (selectedAccount === "report") {
        const response = await getFinancialStatement1API(req);
        const Period = `${startDateVal} - ${endDateVal}`;
        const htmlContent = uiFinancialStatement(response, companyName, Period);
        await convertPDF({ htmlContent, setSuccessMsg, setErrMsg, setOpenPdf });
      }
      setFormData({
        selectedAccount: "111",
        startDateVal: "",
        endDateVal: "",
      });
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openPdf} setOpenModal={setOpenPdf} width="w-[540px]">
      <Modal.Header
        icon={<FaFilePdf />}
        className="bg-orange-500"
        headerText="PDF"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* selected account */}
          <div className="mb-5">
            <Select.Label title="Selected Account" htmlFor="selectedAccount1" />
            <Select
              id="selectedAccount1"
              name="selectedAccount"
              className="focus:ring-orange-500 w-full"
              onChange={handleChange}
            >
              <Select.Option title="Cash" value="111" />
              <Select.Option title="Receivable" value="112" />
              <Select.Option title="Assets" value="113" />
              <Select.Option title="Liability" value="211" />
              <Select.Option title="Equity" value="311" />
              <Select.Option title="Sales" value="411" />
              <Select.Option title="Purchase" value="511" />
              <Select.Option title="Expense Others" value="514" />
              <Select.Option title="Revenue Others" value="611" />
              <Select.Option title="Financial Statements" value="report" />
            </Select>
          </div>
          {/* start date */}
          <div className="mb-5">
            <InputDate
              title="Start Date"
              className="focus:ring-orange-500"
              htmlForId="startDate1"
              name="startDateVal"
              onChange={handleChange}
            />
          </div>
          {/* end date */}
          <div className="mb-5">
            <InputDate
              title="End Date"
              className="focus:ring-orange-500"
              htmlForId="endDate1"
              name="endDateVal"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Cancel"
            type="button"
            className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
            onClick={() => setOpenPdf(false)}
          />
          <Button
            title="Done"
            type="submit"
            disabled={loading ? true : false}
            className={`bg-orange-500 hover:ring-orange-600 ${
              loading
                ? "cursor-not-allowed bg-opacity-65"
                : "hover:bg-orange-600"
            }`}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalPdfAccounting;
