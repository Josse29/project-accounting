import React, { useState } from "react";
import { Alert, Button, InputDate, Modal, Select } from "../../components";
import { FaFileExcel } from "react-icons/fa6";
import { getAccountingCSVAPI } from "../../services/accounting";
import { convertCSV } from "../../utils";

// import { getAccountingCSVAPI } from "../../services/accounting";
//
const ModaCsvAccounting = (props) => {
  const { openCsv, setOpenCsv, setSuccessMsg } = props;
  const [formData, setFormData] = useState({
    selectedAccount: "111",
    startDateVal: "",
    endDateVal: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const data = await getAccountingCSVAPI(req);
      await convertCSV({ data, setSuccessMsg, setErrMsg, setOpenCsv });
    } catch (error) {
      setErrMsg(error.message.split(":")[2] || error);
      setSuccessMsg("");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openCsv} setOpenModal={setOpenCsv} width="w-[540px]">
      <Modal.Header
        icon={<FaFileExcel />}
        className="bg-green-500"
        headerText="Excel"
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
              className="focus:ring-green-500 w-full"
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
            </Select>
          </div>
          {/* start date */}
          <div className="mb-5">
            <InputDate
              title="Start Date"
              className="focus:ring-green-500"
              htmlForId="startDate1"
              name="startDateVal"
              onChange={handleChange}
            />
          </div>
          {/* end date */}
          <div className="mb-5">
            <InputDate
              title="End Date"
              className="focus:ring-green-500"
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
            className="bg-red-500 hover:bg-red-600 hover:ring-red-600"
            onClick={() => setOpenCsv(false)}
          />
          <Button
            title="Done"
            type="submit"
            disabled={loading ? true : false}
            className={`bg-green-500 hover:ring-green-500 ${
              loading
                ? "bg-opacity-65 cursor-not-allowed"
                : "cursor-pointer hover:bg-green-600"
            }`}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModaCsvAccounting;
