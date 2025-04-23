import React, { useState } from "react";
import { Alert, Button, InputDate, Modal } from "../../components";
import { FaFilePdf } from "react-icons/fa6";
import { getStockPDFAPI } from "../../services/stock";
import { convertPDF, uiStockPDF } from "../../utils";

const ModalPdfStock = (props) => {
  const { openPdf, setOpenPdf, setSuccessMsg } = props;
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { startDate, endDate } = formData;
      const req = {
        startDateVal: startDate,
        endDateVal: endDate,
      };
      const stocks = await getStockPDFAPI(req);
      const htmlContent = uiStockPDF(stocks);
      await convertPDF({
        htmlContent,
        setSuccessMsg,
        setErrMsg,
        setOpenPdf,
      });
    } catch (error) {
      setErrMsg(error.message.split(":")[2] || error);
      setSuccessMsg("");
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
        headerText="Stock"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* start date */}
          <div className="mb-5">
            <InputDate
              title="Start Date"
              htmlForId="startDate"
              className="focus:ring-orange-500"
              name="startDate"
              onChange={handleChange}
            />
          </div>
          {/* end date */}
          <div className="mb-5">
            <InputDate
              title="End Date"
              htmlForId="endDate"
              className="focus:ring-orange-500"
              name="endDate"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            title="Cancel"
            className="bg-slate-500 hover:bg-slate-700 hover:ring-slate-600"
            onClick={() => setOpenPdf(false)}
          />
          <Button
            type="submit"
            title={loading ? "Wait..." : "Convert"}
            className={`bg-orange-500 ${
              loading
                ? "bg-opacity-65 cursor-not-allowed"
                : "cursor-pointer hover:bg-orange-600 hover:ring-orange-600"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalPdfStock;
