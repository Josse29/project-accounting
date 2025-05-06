import React, { useState } from "react";
import { Alert, Button, InputPassword, Modal } from "../../components";
import SelectAdmin from "./SelectAdmin";
import { resetPassAPI } from "../../services";

const ModalResetPassword = (props) => {
  const { setSuccessMsg, resetPassword, setResetPassword } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    UserIdVal: "",
    UserNameVal: "",
    UserPasswordVal: "",
    UserPassword1Val: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    if (name === "UserIdVal") {
      setFormData((prev) => ({
        ...prev,
        UserIdVal: value,
        UserNameVal: options[selectedIndex].getAttribute("data-username"),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { UserIdVal, UserNameVal, UserPasswordVal, UserPassword1Val } =
      formData;
    console.log(UserIdVal, UserNameVal, UserPasswordVal, UserPassword1Val);
    try {
      const response = await resetPassAPI({
        UserIdVal,
        UserNameVal,
        UserPasswordVal,
        UserPassword1Val,
      });

      setErrMsg("");
      setFormData({
        UserIdVal: "",
        UserNameVal: "",
        UserPasswordVal: "",
        UserPassword1Val: "",
      });
      setSuccessMsg(response);
      setResetPassword(false);
    } catch (error) {
      setErrMsg(error.message.split(":")[2] || error);
      setSuccessMsg("");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={resetPassword} width="w-[560px]">
      <Modal.Header headerText="Reset Password" className="bg-sky-600" />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* select admin */}
          <div className="mb-4">
            <SelectAdmin
              setLoading={setLoading}
              name="UserIdVal"
              value={formData.UserIdVal}
              onChange={handleChange}
            />
          </div>
          {/* password */}
          <div className="mb-4">
            <InputPassword>
              <InputPassword.Label
                title="Password"
                htmlFor="password"
                passwordVisible={passwordVisible}
                setpasswordVisible={setPasswordVisible}
              />
              <InputPassword.Input
                id="password"
                className="focus:ring-sky-600"
                passwordVisible={passwordVisible}
                name="UserPasswordVal"
                value={formData.UserPasswordVal}
                onChange={handleChange}
              />
            </InputPassword>
          </div>
          {/* confirmation password */}
          <div className="mb-4">
            <InputPassword>
              <InputPassword.Label
                title="Confirmation Password"
                htmlFor="password-1"
                passwordVisible={passwordVisible1}
                setpasswordVisible={setPasswordVisible1}
              />
              <InputPassword.Input
                id="password-1"
                className="focus:ring-sky-600"
                passwordVisible={passwordVisible1}
                name="UserPassword1Val"
                value={formData.UserPassword1Val}
                onChange={handleChange}
              />
            </InputPassword>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Cancel"
            type="button"
            className="bg-red-600 hover:ring-red-700"
            onClick={() => setResetPassword(false)}
          />
          <Button
            title={loading ? "wait..." : "Done"}
            type="submit"
            className={`bg-sky-600 hover:ring-sky-700 ${
              loading && "bg-opacity-65"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalResetPassword;
