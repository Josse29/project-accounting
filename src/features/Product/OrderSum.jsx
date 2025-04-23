import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { formatCurrency1 } from "../../utils";
import { InputPercent } from "../../components";

const OrderSum = (props) => {
  const { title, setFormData, formData, handleChange } = props;
  const handlePlus = () => {
    setFormData((prev) => ({
      ...prev,
      productQty: parseFloat(formData.productQty + 1),
    }));
  };
  const handleMinus = () => {
    if (formData.productQty > 0) {
      setFormData((prev) => ({
        ...prev,
        productQty: parseFloat(formData.productQty - 1),
      }));
    }
  };
  const price =
    parseFloat(
      title === "buy" ? formData.productPriceBuy : formData.productPriceSell
    ) || 0;
  const qty = parseFloat(formData.productQty) || 0;
  const percent = parseFloat(formData.percent) || 0;
  const subtotal = price * qty;
  const discount = percent > 0 ? (subtotal * percent) / 100 : 0;
  const grandTotal = subtotal - discount;
  return (
    <>
      {/* qty */}
      <div className="mb-3">
        <div className="flex justify-between items-center">
          <label className="text-2xl" htmlFor="qty">
            Qty
          </label>
          <div className="flex flex-row gap-3">
            <div
              className="bg-red-600 hover:bg-red-700 hover:ring-2 hover:ring-red-700 hover:border-2 hover:border-white px-3 py-2 flex items-center rounded-md cursor-pointer"
              onClick={handleMinus}
            >
              <FaMinus className="text-white text-xl" />
            </div>
            <input
              type="text"
              id="qty"
              className="w-[80px] border-none focus:ring-2 focus:ring-slate-200 text-3xl focus:border-none rounded-md text-center"
              placeholder="0"
              onChange={handleChange}
              name="productQty"
              value={formData.productQty}
            />
            <div
              className="bg-green-600 hover:bg-green-700 hover:ring-2 hover:ring-green-700 hover:border-2 hover:border-white px-3 py-2 flex items-center rounded-md cursor-pointer"
              onClick={handlePlus}
            >
              <FaPlus className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* subtotal, discount, grand total */}
      <div className="mb-5">
        {/* sub total */}
        <div className="flex justify-between mb-1">
          <div className="text-xl">Sub Total </div>
          <div className="text-xl">{formatCurrency1(price * qty)}</div>
        </div>
        {/* discount */}
        <div className="mb-1">
          <InputPercent
            title="Discount"
            className="focus:ring-slate-200 w-[75px]"
            htmlForId="discount"
            name="percent"
            value={formData.percent}
            setFormData={setFormData}
          />
        </div>
        {/* total */}
        <div className="flex justify-between mb-1">
          <div className="text-xl">Grand Total</div>
          <div className="text-xl">{formatCurrency1(grandTotal)}</div>
        </div>
      </div>
    </>
  );
};

export default OrderSum;
