import React, { useState } from "react";
import { Alert, Button, InputDate, Modal } from "../../components";
import { FaFileExcel } from "react-icons/fa6";
import { getStockCSV1API } from "../../services/stock";
import { convertCSV } from "../../utils";

const ModalCSVSale = (props) => {
  const { openCsv, setOpenCsv, setSuccessMsg } = props;
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
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
      const data = {
        startDateVal: startDate,
        endDateVal: endDate,
      };
      const sales = await getStockCSV1API(data);
      await convertCSV({
        data: sales,
        setSuccessMsg,
        setErrMsg,
        setOpenCsv,
      });
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openCsv} width="w-[540px]">
      <Modal.Header
        icon={<FaFileExcel />}
        className="bg-green-500"
        headerText="Sale"
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
              className="focus:ring-green-500"
              name="startDate"
              onChange={handleChange}
            />
          </div>
          {/* end date */}
          <div className="mb-5">
            <InputDate
              title="End Date"
              htmlForId="endDate"
              className="focus:ring-green-500"
              name="endDate"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            title="Cancel"
            className="bg-red-600 hover:bg-red-700 hover:ring-red-700"
            onClick={() => setOpenCsv(false)}
          />
          <Button
            type="submit"
            title={loading ? "Wait...." : "Convert"}
            className={`bg-green-500 ${
              loading
                ? "bg-opacity-65 cursor-not-allowed"
                : "cursor-pointer hover:bg-green-600 hover:ring-green-700"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCSVSale;
