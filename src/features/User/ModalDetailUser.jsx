import React from "react";
import { Button, Modal } from "../../components";
import { FaEye } from "react-icons/fa6";

const ModalDetailUser = (props) => {
  const { openDetail, setOpenDetail, detailUser } = props;
  const { UserFullname, UserEmail, UserPosition, UserImg, UserInfo } =
    detailUser;
  return (
    <Modal openModal={openDetail} width="w-[540px]">
      <Modal.Header
        className="bg-green-500"
        headerText={UserFullname}
        icon={<FaEye />}
      />
      <Modal.Body>
        {/* email name*/}
        <div className="mb-5">
          <div className="text-2xl mb-2">Email:</div>
          <div className="text-2xl ms-2">{UserEmail}</div>
        </div>
        {/* fullname */}
        <div className="mb-5">
          <div className="text-2xl mb-2">Fullname :</div>
          <div className="text-2xl ms-2 capitalize">{UserFullname}</div>
        </div>
        {/* position */}
        <div className="mb-5">
          <div className="text-2xl mb-2">Position:</div>
          <div className="text-2xl ms-2 capitalize">{UserPosition}</div>
        </div>
        {/* image */}
        <div className="mb-5">
          <div className="text-2xl mb-3">Image : </div>
          {UserImg !== "" ? (
            <img src={UserImg && UserImg} alt="" className="w-full h-fit" />
          ) : (
            <div className="text-xl italic text-slate-500 ms-2">
              No Preview Image
            </div>
          )}
        </div>
        {/* info */}
        <div className="mb-5">
          <div className="text-2xl mb-2">More Information :</div>
          {UserInfo !== "" ? (
            <div className="text-lg ms-2">{UserInfo}</div>
          ) : (
            <div className="text-lg ms-2">-</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer onClick={() => setOpenDetail(false)}>
        <Button
          title="Cancel"
          className="bg-red-500 hover:bg-red-600 hover:ring-[#f85858]"
        />
        <Button
          title="Done"
          className="bg-green-500 hover:bg-green-600 hover:ring-green-500"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetailUser;
