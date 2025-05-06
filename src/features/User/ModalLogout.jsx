import React, { useContext } from "react";
import { AllContext } from "../../context/AllProvider";
import { ButtonIcon, Modal } from "../../components";
import { FaDoorOpen } from "react-icons/fa6";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

const ModalLogout = () => {
  const { logout, setLogout, setUserLogin } = useContext(AllContext);
  const navigate = useNavigate();
  return (
    <Modal openModal={logout} width="w-[560px]">
      <Modal.Header className="bg-red-600 font-bold" headerText="Logout" />
      <Modal.Body>
        <FaDoorOpen className="text-red-600 text-8xl mx-auto my-3" />{" "}
        <div className="text-3xl text-slate-800 text-center font-bold capitalize">
          Are You Sure to logout?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonIcon
          type="button"
          title="No"
          icon={<FaTimes />}
          className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-400"
          onClick={() => setLogout(false)}
        />
        <ButtonIcon
          type="button"
          title="Sure"
          icon={<FaCheck />}
          className="bg-red-600 hover:bg-red-700 hover:ring-red-500"
          onClick={() => {
            setLogout(false);
            setUserLogin({});
            localStorage.removeItem("verifyToken");
            navigate("/");
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLogout;
