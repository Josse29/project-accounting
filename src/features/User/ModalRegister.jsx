import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  InputImg,
  InputPassword,
  InputText,
  Modal,
  Select,
  TextArea,
} from "../../components";
import { FaAddressBook } from "react-icons/fa6";
import { registerAPI } from "../../services/user";
import { getUser2 } from "../../utils";

const ModalRegister = (props) => {
  const {
    openRegister,
    setOpenRegister,
    setSuccessMsg,
    setUser,
    setTotalRows,
    setTotalPages,
  } = props;
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    img: "",
    position: "",
    password: "",
    password1: "",
    info: "",
  });
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [passwordVisible1, setpasswordVisible1] = useState(false);
  const [img, setImg] = useState(false);
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const modalBodyRef = useRef(null);
  const scrollToTop = () => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
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
      // 1.send api
      const { email, fullname, position, img, password, password1, info } =
        formData;
      const req = {
        UserEmailVal: email,
        UserFullnameVal: fullname,
        UserPasswordVal: password,
        UserPassword1Val: password1,
        UserImgVal: img,
        UserPositionVal: position,
        UserInfoVal: info,
      };
      const response = await registerAPI(req);
      // 2. fetch again
      const params = {
        setUser,
        setTotalRows,
        setTotalPages,
      };
      await getUser2(params);
      // 2. reset form
      setFormData(() => ({
        email: "",
        fullname: "",
        img: "",
        position: "",
        password: "",
        password1: "",
        info: "",
      }));
      imgRef.current.value = "";
      setImg(false);
      // 3. back to reset
      setSuccessMsg(response);
      setErrMsg("");
      setOpenRegister(false);
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      scrollToTop();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openRegister} width="w-[610px]">
      <Modal.Header
        headerText="Register"
        icon={<FaAddressBook />}
        className="bg-[#4338ca]"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert */}
          <div className="mb-5">
            <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          </div>
          {/* fullname */}
          <div className="mb-5">
            <InputText
              htmlFor1="fullname"
              title="Fullname"
              name="fullname"
              value={formData.fullname}
              className="focus:ring-[#4338ca] capitalize"
              placeholder="Ex : Josse Surya Pinem"
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className="mb-5">
            <InputText
              title="Email"
              name="email"
              value={formData.email}
              htmlFor1="email1"
              className="focus:ring-[#4338ca]"
              placeholder="Ex : pinemjosse@gmail.com"
              onChange={handleChange}
            />
          </div>
          {/* position */}
          <div className="mb-5">
            <Select.Label title="Position" htmlFor="position1" />
            <Select
              className="w-full focus:ring-[#4338ca]"
              id="position1"
              name="position"
              value={formData.position}
              onChange={handleChange}
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
          {/* photo */}
          <div className="mb-5">
            <InputImg
              img={img}
              setImg={setImg}
              imgRef={imgRef}
              setLoading={setLoading}
              className="focus:ring-[#4338ca]"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* selected */}
          {formData.position === "admin" && (
            <>
              {/* password */}
              <InputPassword className="mb-5">
                <InputPassword.Label
                  title="Password"
                  passwordVisible={passwordVisible}
                  setpasswordVisible={setpasswordVisible}
                  htmlFor="password1"
                />
                <InputPassword.Input
                  className="focus:ring-[#4338ca]"
                  id="password1"
                  onChange={handleChange}
                  passwordVisible={passwordVisible}
                  name="password"
                  value={formData.password}
                />
              </InputPassword>
              {/* confirmation-password */}
              <InputPassword className="mb-5">
                <InputPassword.Label
                  title="Confirmation Password"
                  passwordVisible={passwordVisible1}
                  setpasswordVisible={setpasswordVisible1}
                  htmlFor="password2"
                />
                <InputPassword.Input
                  className="focus:ring-[#4338ca]"
                  id="password2"
                  onChange={handleChange}
                  passwordVisible={passwordVisible1}
                  name="password1"
                  value={formData.password1}
                />
              </InputPassword>
            </>
          )}
          {/* more information */}
          <div className="mb-5">
            <TextArea
              title="More Information "
              htmlFor1="info"
              className="focus:ring-[#4338ca]"
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
            onClick={() => setOpenRegister(false)}
          />
          <Button
            type="submit"
            title="Register"
            className={`bg-[#4338ca] ${
              loading
                ? "cursor-not-allowed bg-[#948ddf]"
                : "cursor-pointer hover:bg-[#2d258a] hover:ring-violet-500"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalRegister;
