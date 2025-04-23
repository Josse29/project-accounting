import React from "react";
import { Button, Modal } from "../../components";
import { FaEye } from "react-icons/fa6";
import { formatCurrency1 } from "../../utils/formatCurrency";

const ModalDetailProduct = (props) => {
  const { openDetail, setOpenDetail, dataDetail } = props;
  const {
    ProductName,
    ProductPriceBuy,
    ProductPriceSell,
    ProductImage,
    SupplierName,
    ProductInfo,
  } = dataDetail;
  return (
    <Modal openModal={openDetail} width="w-[540px]">
      <Modal.Header
        className="bg-green-500"
        headerText={ProductName}
        icon={<FaEye />}
      />
      <Modal.Body>
        {/* product name*/}
        <div className="mb-5">
          <div className="text-2xl mb-2">Product Name :</div>
          <div className="text-2xl ms-2">{ProductName}</div>
        </div>
        {/* price buy */}
        <div className="mb-5">
          <div className="text-2xl mb-2">Price Buy :</div>
          <div className="text-2xl ms-2">
            {formatCurrency1(ProductPriceBuy)}
          </div>
        </div>
        {/* price sell */}
        <div className="mb-5">
          <div className="text-2xl mb-2">Price Sell :</div>
          <div className="text-2xl ms-2">
            {formatCurrency1(ProductPriceSell)}
          </div>
        </div>
        {/* image */}
        <div className="mb-5">
          <div className="text-2xl mb-3">Image : </div>
          {ProductImage !== "" ? (
            <img src={ProductImage} alt="" className="w-full h-fit" />
          ) : (
            <div className="text-xl italic text-slate-500 ms-2">
              No Preview Image
            </div>
          )}
        </div>
        {/* supplier name */}
        <div className="mb-5">
          <div className="text-2xl mb-2">Supplier Name :</div>
          {SupplierName !== null ? (
            <div className="text-2xl ms-2">{SupplierName}</div>
          ) : (
            <div className="text-2xl ms-2">-</div>
          )}
        </div>
        {/* info */}
        <div className="mb-5">
          <div className="text-2xl mb-2">More Information :</div>
          {ProductInfo !== "" ? (
            <div className="text-lg ms-2">{ProductInfo}</div>
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
          className="bg-green-500 hover:bg-green-700 hover:ring-green-500"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetailProduct;
