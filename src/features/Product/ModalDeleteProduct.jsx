import React, { useEffect, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { ButtonIcon, Modal } from "../../components";
import { FaTrashCan } from "react-icons/fa6";
import { deleteProductAPI } from "../../services/product";
import { getProduct3 } from "../../utils";

const ModalDeleteProduct = (props) => {
  const {
    openDelete,
    setOpenDelete,
    dataDelete,
    setSuccessMsg,
    setReq,
    setProduct,
    setTotalRows,
    setTotalPages,
  } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    ProductId: "",
    ProductName: "",
  });
  useEffect(() => {
    if (openDelete && dataDelete?.ProductId) {
      setLoading(true);
      const { ProductId, ProductName } = dataDelete;
      setformData({
        ProductId,
        ProductName,
      });
      setLoading(false);
    }
  }, [openDelete, dataDelete]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // send api
      const { ProductId, ProductName } = formData;
      const response = await deleteProductAPI({ ProductId, ProductName });
      // fetch again
      await getProduct3({ setReq, setProduct, setTotalRows, setTotalPages });
      setSuccessMsg(response);
      setOpenDelete(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openDelete} width="w-[560px]">
      <Modal.Header
        className="bg-red-600"
        headerText={formData.ProductName}
        icon={<FaTrashCan />}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FaExclamationTriangle className="text-red-600 text-8xl mx-auto mb-3" />
          <div className="text-2xl text-slate-800 text-center font-bold capitalize">
            Are You Sure to delete - {formData.ProductName} ?
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
            title="Done"
            icon={<FaCheck />}
            className="bg-red-600 hover:bg-red-700 hover:ring-red-500"
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalDeleteProduct;
