import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  InputDate,
  InputImg,
  InputText,
  Modal,
  TextArea,
} from "../../components";
import { getCompanyAPI, updateCompanyAPI } from "../../services";

const ModalUpdateCompany = (props) => {
  const { modalUpdate, setModalUpdate, data, setCompany } = props;
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    CompanyNameVal: "",
    CompanyEstVal: "",
    img: "",
    CompanyInfoVal: "",
    CompanyIdVal: 1,
  });
  useEffect(() => {
    if (modalUpdate && data) {
      setLoading(true);
      const { CompanyId, CompanyName, CompanyEst, CompanyImg, CompanyInfo } =
        data;
      setFormData(() => ({
        CompanyNameVal: CompanyName,
        CompanyEstVal: CompanyEst,
        img: CompanyImg,
        CompanyInfoVal: CompanyInfo,
        CompanyIdVal: CompanyId,
      }));
      if (CompanyImg?.startsWith("data:image")) {
        setImg(true);
      } else {
        setImg(false);
      }
      setLoading(false);
    }
  }, [modalUpdate, data]);
  const [img, setImg] = useState(false);
  const imgRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const modalBodyRef = useRef(null);
  const scrollToTop = () => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        CompanyNameVal,
        CompanyEstVal,
        img,
        CompanyInfoVal,
        CompanyIdVal,
      } = formData;
      console.log(CompanyNameVal);
      const response = await updateCompanyAPI({
        CompanyNameVal,
        CompanyEstVal,
        CompanyImgVal: img,
        CompanyInfoVal,
        CompanyIdVal,
      });
      console.log(response);
      const response1 = await getCompanyAPI();
      setErrMsg("");
      setCompany(response1[0]);
      setModalUpdate(false);
    } catch (error) {
      console.error(error);
      setErrMsg(error.message.split(":")[2] || error);
      scrollToTop();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={modalUpdate} width="w-[560px]">
      <Modal.Header headerText="Company" className="bg-sky-600" />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert error */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* CompanyNameVal */}
          <div className="mb-4">
            <InputText
              title="Company Name"
              htmlFor1="company"
              className="focus:border-sky-600 capitalize"
              placeholder="ex : Company.."
              name="CompanyNameVal"
              value={formData.CompanyNameVal}
              onChange={handleChange}
            />
          </div>
          {/* CompanyEstVal */}
          <div className="mb-4">
            <InputDate
              title="Company Established"
              className="focus:border-sky-600"
              htmlForId="company_date"
              name="CompanyEstVal"
              value={formData.CompanyEstVal}
              onChange={handleChange}
            />
          </div>
          {/* CompanyImg */}
          <div className="mb-4">
            <InputImg
              title="Company Image"
              img={img}
              setImg={setImg}
              imgRef={imgRef}
              setLoading={setLoading}
              className="focus:ring-sky-600"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* Compan */}
          <div className="mb-4">
            <TextArea
              title="More Information"
              placeholder="ex : Company.."
              htmlFor1="info"
              className="focus:border-sky-600"
              name="CompanyInfoVal"
              value={formData.CompanyInfoVal}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="bg-red-500 hover:ring-red-600"
            title="Cancel"
            onClick={() => setModalUpdate(false)}
          />
          <Button
            type="submit"
            title={loading ? "wait..." : "Done"}
            className={`bg-sky-600 hover:ring-sky-700 ${
              loading && "cursor-not-allowed bg-opacity-50"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalUpdateCompany;
