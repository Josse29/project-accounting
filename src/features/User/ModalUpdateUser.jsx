import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  InputImg,
  InputText,
  Modal,
  Select,
  TextArea,
} from "../../components";
import { FaEdit } from "react-icons/fa";
import { updateUserAPI } from "../../services/user";
import { getUser2 } from "../../utils";

const ModalUpdateUser = (props) => {
  const {
    setSuccessMsg,
    openUpdate,
    setOpenUpdate,
    updateUser,
    setUser,
    setTotalRows,
    setTotalPages,
  } = props;
  const [formData, setFormData] = useState({
    id: 1,
    email: "",
    fullname: "",
    img: "",
    position: "",
    info: "",
  });
  // const [passwordVisible, setpasswordVisible] = useState(false);
  // const [passwordVisible1, setpasswordVisible1] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [img, setImg] = useState(false);
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (updateUser) {
      const {
        UserId = "",
        UserFullname = "",
        UserEmail = "",
        UserImg = "",
        UserInfo = "",
        UserPosition = "",
      } = updateUser;
      setFormData((prev) => ({
        ...prev,
        id: UserId || "",
        fullname: UserFullname || "",
        email: UserEmail || "",
        img: UserImg || "",
        info: UserInfo || "",
        position: UserPosition || "",
      }));
      if (UserImg.startsWith("data:image")) {
        setImg(true);
      } else {
        setImg(false);
      }
    }
    setLoading(false);
  }, [updateUser]);
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
      // send api
      const { email, fullname, img, position } = formData;
      const req = {
        UserEmailVal: email,
        UserFullnameVal: fullname,
        UserImgVal: img,
        UserPositionVal: position,
        UserIdVal: updateUser.UserId,
      };
      const response = await updateUserAPI(req);
      // fetch again
      const params = {
        setUser,
        setTotalRows,
        setTotalPages,
      };
      await getUser2(params);
      // reset ui
      setSuccessMsg(response);
      setErrMsg("");
      setOpenUpdate(false);
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal openModal={openUpdate} width="w-[610px]">
      <Modal.Header
        icon={<FaEdit />}
        headerText={formData.fullname}
        className="bg-sky-600"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* alert */}
          <div className="mb-5">
            <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          </div>
          {/* Fullname */}
          <div className="mb-5">
            <InputText
              htmlFor1="fullname"
              title="Fullname"
              name="fullname"
              value={formData.fullname}
              className="focus:ring-sky-600 capitalize"
              placeholder="Ex : Josse Surya Pinem"
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="mb-5">
            <InputText
              title="Email"
              name="email"
              value={formData.email}
              htmlFor1="email1"
              className="focus:ring-sky-600"
              placeholder="Ex : pinemjosse@gmail.com"
              onChange={handleChange}
            />
          </div>
          {/* Position */}
          <div className="mb-5">
            <Select.Label title="Position" htmlFor="position1" />
            <Select
              className="w-full focus:ring-sky-600"
              id="position1"
              onChange={handleChange}
              value={formData.position}
              name="position"
            >
              <Select.Option value="null" title="Choose One Of Position" />
              <Select.Option value="admin" title="Admin" />
              <Select.Option value="creditor" title="Creditor" />
              <Select.Option value="customer" title="Customer" />
              <Select.Option value="investor" title="Investor" />
              <Select.Option value="sale" title="Sale" />
              <Select.Option value="supplier" title="Supplier" />
            </Select>
          </div>
          {/* Image Upload */}
          <div className="mb-5">
            <InputImg
              img={img}
              setImg={setImg}
              setLoading={setLoading}
              className="focus:ring-sky-600"
              imgRef={imgRef}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* Password (for admin only) comingsoon...*/}
          {/* Info */}
          <div className="mb-5">
            <TextArea
              title="More Information"
              htmlFor1="info"
              className="focus:ring-sky-600"
              name="info"
              onChange={handleChange}
              value={formData.info}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            title="Cancel"
            className="bg-red-600 hover:bg-red-700 hover:ring-red-500"
            onClick={() => setOpenUpdate(false)}
          />
          <Button
            type="submit"
            title={loading ? "wait..." : "Done"}
            className={`bg-sky-600 ${
              loading
                ? "cursor-not-allowed bg-opacity-65"
                : "cursor-pointer hover:bg-sky-700 hover:ring-sky-500 "
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
