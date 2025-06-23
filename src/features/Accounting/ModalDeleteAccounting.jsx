import React, { useContext, useState } from "react";
import { Button, ButtonIcon, Modal } from "../../components";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { deleteAccountingAPI } from "../../services";
import { getAccounting3 } from "../../utils";
import { AllContext } from "../../context/AllProvider";

const ModalDeleteAccounting = (props) => {
  const { getFinancialStatement } = useContext(AllContext);
  const {
    openDelete,
    setOpenDelete,
    setSuccessMsg,
    setReq,
    setAccounting,
    setTotalRows,
    setTotalPages,
  } = props;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await deleteAccountingAPI();
      setSuccessMsg(response);
      await getFinancialStatement();
      await getAccounting3({
        setReq,
        setAccounting,
        setTotalRows,
        setTotalPages,
      });
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openDelete} width="480px">
      <Modal.Header
        headerText="Accounting"
        icon={<FaTrashCan />}
        className="bg-red-600"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FaExclamationTriangle className="text-red-600 text-8xl mx-auto mb-3" />
          <div className="text-2xl text-slate-800 text-center font-bold capitalize mb-2">
            Are You Sure to delete - Last Transaction ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonIcon
            type="button"
            title="Cancel"
            icon={<FaTimes />}
            className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-400"
            onClick={() => setOpenDelete(false)}
          />
          <ButtonIcon
            type="submit"
            title={loading ? "wait...." : "Done"}
            icon={<FaCheck />}
            className={`bg-red-600 hover:ring-red-700 ${
              loading && "bg-opacity-65"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalDeleteAccounting;
