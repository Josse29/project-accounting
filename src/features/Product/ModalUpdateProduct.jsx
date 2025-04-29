import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  InputBalance,
  InputImg,
  InputText,
  Modal,
} from "../../components";
import { formatCurrency, getProduct3, unFormatCurrency } from "../../utils";
import { FaEdit } from "react-icons/fa";
import { SelectSupplier } from "../User";
import { updateProductAPI } from "../../services/product";

const ModalUpdateProduct = (props) => {
  const {
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setSuccessMsg,
    setReq,
    setProduct,
    setTotalRows,
    setTotalPages,
  } = props;
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    priceBuy: "",
    priceSell: "",
    img: "",
    supplierId: "",
    productInfo: "",
  });
  const imgRef = useRef(null);
  const [img, setImg] = useState(false);
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
  useEffect(() => {
    if (openUpdate && dataUpdate?.ProductId) {
      setLoading(true);
      const {
        ProductId,
        ProductName,
        ProductPriceBuy,
        ProductPriceSell,
        ProductImage,
        SupplierId,
        ProductInfo,
      } = dataUpdate;
      setFormData(() => ({
        productId: ProductId,
        productName: ProductName,
        priceBuy: formatCurrency(parseFloat(ProductPriceBuy)),
        priceSell: formatCurrency(parseFloat(ProductPriceSell)),
        img: ProductImage,
        supplierId: SupplierId,
        productInfo: ProductInfo,
      }));
      if (ProductImage?.startsWith("data:image")) {
        setImg(true);
      } else {
        setImg(false);
      }
      setLoading(false);
    }
  }, [openUpdate, dataUpdate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // send api
      const {
        productId,
        productName,
        priceBuy,
        priceSell,
        img,
        supplierId,
        productInfo,
      } = formData;
      const req = {
        productId,
        productName,
        productPriceBuy: unFormatCurrency(priceBuy),
        productPriceSell: unFormatCurrency(priceSell),
        productSupplierId: supplierId,
        productInfo,
        productImgVal: img,
      };
      const updated = await updateProductAPI(req);
      // fetch again
      await getProduct3({ setReq, setProduct, setTotalRows, setTotalPages });
      // callback ui
      setSuccessMsg(updated);
      setErrMsg("");
      setOpenUpdate(false);
    } catch (error) {
      console.error(error);
      setSuccessMsg("");
      setErrMsg(error.message.split(":")[2] || error);
      scrollToTop();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openUpdate} width="w-[540px]">
      <Modal.Header
        className="bg-sky-600"
        icon={<FaEdit />}
        headerText={dataUpdate.ProductName}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* product name*/}
          <div className="mb-5">
            <InputText
              title="Product Name"
              htmlFor1="productName1"
              className="focus:ring-sky-600"
              placeholder="ex : product - 1 "
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          {/* price buy */}
          <div className="mb-5">
            <InputBalance
              title="Price Buy"
              htmlFor1="priceBuy1"
              className="focus:focus:ring-sky-600"
              setFormData={setFormData}
              name="priceBuy"
              value={formData.priceBuy}
            />
          </div>
          {/* price sell */}
          <div className="mb-5">
            <InputBalance
              title="Price Sell"
              htmlFor1="priceSell1"
              className="focus:focus:ring-sky-600"
              setFormData={setFormData}
              name="priceSell"
              value={formData.priceSell}
            />
          </div>
          {/* photo */}
          <div className="mb-5">
            <InputImg
              img={img}
              setImg={setImg}
              imgRef={imgRef}
              setLoading={setLoading}
              className="focus:ring-sky-600"
              formData={formData}
              setFormData={setFormData}
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
            <label htmlFor="product-info" className="text-2xl block mb-2">
              More Information
            </label>
            <textarea
              id="product-info"
              type="text"
              className="w-full border-slate-300 rounded-md focus:border-0 focus:ring-2 focus:ring-sky-600 placeholder:text-slate-400"
              placeholder="more information.."
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

export default ModalUpdateProduct;
