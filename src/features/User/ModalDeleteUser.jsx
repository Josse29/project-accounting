import React from "react";
import { ButtonIcon, Modal } from "../../components";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { deleteUserAPI } from "../../services/user";
import { getUser2 } from "../../utils";

const ModalDeleteUser = (props) => {
  const {
    setUser,
    setTotalRows,
    setTotalPages,
    setSuccessMsg,
    openDelete,
    setOpenDelete,
    deleteUser,
  } = props;
  const { UserId, UserFullname } = deleteUser;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1.send api
      const req = {
        UserId,
        UserFullname,
      };
      const response = await deleteUserAPI(req);
      // 2. fetch again
      const params = {
        setUser,
        setTotalRows,
        setTotalPages,
      };
      await getUser2(params);
      // 3. resets
      setSuccessMsg(response);
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal openModal={openDelete} width="w-[540px]">
      <Modal.Header
        className="bg-red-600"
        headerText={UserFullname}
        icon={<FaTrashCan />}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FaExclamationTriangle className="text-red-600 text-8xl mx-auto mb-3" />
          <div className="text-2xl text-slate-800 text-center font-bold">
            Are You Sure to delete {UserFullname} ?
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
            // disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalDeleteUser;
