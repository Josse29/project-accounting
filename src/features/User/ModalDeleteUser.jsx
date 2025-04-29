import React, { useEffect, useState } from "react";
import { ButtonIcon, Modal } from "../../components";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { deleteUserAPI } from "../../services/user";
import { getUser3 } from "../../utils";

const ModalDeleteUser = (props) => {
  const {
    setReq,
    setUser,
    setTotalRows,
    setTotalPages,
    setSuccessMsg,
    openDelete,
    setOpenDelete,
    deleteUser,
  } = props;
  const { UserId, UserFullname } = deleteUser;
  const [loading, setLoading] = useState("");
  const [formData, setFormData] = useState({
    UserId: "",
    UserFullname: "",
  });
  useEffect(() => {
    if (openDelete && deleteUser?.UserId) {
      setLoading(true);
      setFormData({ UserId, UserFullname });
      setLoading(false);
    }
  }, [openDelete, deleteUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1.send api
      const { UserId, UserFullname } = formData;
      const response = await deleteUserAPI({ UserId, UserFullname });
      // 2. fetch again
      await getUser3({
        setReq,
        setUser,
        setTotalRows,
        setTotalPages,
      });
      // 3. resets
      setSuccessMsg(response);
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openDelete} width="w-[540px]">
      <Modal.Header
        className="bg-red-600"
        headerText={formData.UserFullname}
        icon={<FaTrashCan />}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FaExclamationTriangle className="text-red-600 text-8xl mx-auto mb-3" />
          <div className="text-2xl text-slate-800 text-center font-bold">
            Are You Sure to delete {formData.UserFullname} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonIcon
            type="button"
            icon={<FaTimes />}
            title="Cancel"
            className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-400"
            onClick={() => setOpenDelete(false)}
          />
          <ButtonIcon
            type="submit"
            icon={<FaCheck />}
            title="Done"
            className="bg-red-600 hover:bg-red-700 hover:ring-red-500"
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalDeleteUser;
