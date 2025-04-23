import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  InputBalance,
  InputImg,
  InputText,
  Modal,
  TextArea,
} from "../../components";
import { getProduct3, unFormatCurrency } from "../../utils";
import { FaFolderPlus } from "react-icons/fa6";
import { SelectSupplier } from "../User";
import { createProductAPI } from "../../services/product";

const ModalCreateProduct = (props) => {
  const {
    openCreate,
    setOpenCreate,
    setSuccessMsg,
    setReq,
    setProduct,
    setTotalRows,
    setTotalPages,
  } = props;
  const [formData, setFormData] = useState({
    productName: "",
    priceBuy: "",
    priceSell: "",
    img: "",
    supplierId: "",
    productInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [img, setImg] = useState(false);
  const imgRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      // sendAPI
      const { productName, priceBuy, priceSell, productInfo, supplierId, img } =
        formData;
      const req = {
        productName: productName,
        productPriceBuy: unFormatCurrency(priceBuy),
        productPriceSell: unFormatCurrency(priceSell),
        productInfo: productInfo,
        productSupplierId: supplierId,
        productImg: img,
      };
      const created = await createProductAPI(req);
      // fetch again
      await getProduct3({ setReq, setProduct, setTotalRows, setTotalPages });
      // reset form
      setFormData(() => ({
        productName: "",
        priceBuy: "",
        priceSell: "",
        img: "",
        supplierId: "",
        productInfo: "",
      }));
      imgRef.current.value = "";
      setImg(false);
      // callback ui
      setSuccessMsg(created);
      setErrMsg("");
      setOpenCreate(false);
    } catch (error) {
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      scrollToTop();
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openCreate} width="w-[540px]">
      <Modal.Header
        icon={<FaFolderPlus />}
        className="bg-sky-600"
        headerText="Add Product"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* product name*/}
          <div className="mb-5">
            <InputText
              htmlFor1="productname1"
              title="Product Name"
              className="focus:ring-sky-600 capitalize"
              placeholder="ex : Product - 1 "
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          {/* price buy */}
          <div className="mb-5">
            <InputBalance
              htmlFor1="priceBuy1"
              title="Price Buy"
              className="focus:ring-sky-600"
              name="priceBuy"
              value={formData.priceBuy}
              setFormData={setFormData}
            />
          </div>
          {/* price sell */}
          <div className="mb-5">
            <InputBalance
              htmlFor1="pricesell1"
              title="Price Sell"
              className="focus:ring-sky-600"
              name="priceSell"
              value={formData.priceSell}
              setFormData={setFormData}
            />
          </div>
          {/* image */}
          <div className="mb-5">
            <InputImg
              img={img}
              setImg={setImg}
              imgRef={imgRef}
              setLoading={setLoading}
              formData={formData}
              setFormData={setFormData}
              className="focus:ring-sky-600"
            />
          </div>
          {/* supplier */}
          <div className="mb-5">
            <SelectSupplier
              htmlForId="supplier1"
              className="focus:ring-sky-600"
              onChange={handleChange}
              name="supplierId"
              value={formData.supplierId}
            />
          </div>
          {/* info */}
          <div className="mb-5">
            <TextArea
              htmlFor1="productInfo1"
              title="More Information"
              className="focus:ring-sky-600"
              name="productInfo"
              value={formData.productInfo}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            title="Cancel"
            className="bg-red-500 hover:bg-red-600 hover:ring-[#f85858]"
            onClick={() => setOpenCreate(false)}
          />
          <Button
            type="submit"
            title={loading ? "Wait...." : "Done"}
            className={`bg-sky-600 hover:bg-sky-700 hover:ring-sky-500 ${
              loading && "cursor-not-allowed opacity-50"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateProduct;
