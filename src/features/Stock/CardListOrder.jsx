import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import {
  getStorageCart,
  getStorageCartSum,
  formatCurrency1,
} from "../../utils";

const CardListOrder = (props) => {
  const { setOpenModal } = props;
  const [carts, setCarts] = useState([]);
  const [cartSum, setCartSum] = useState({
    qty: 0,
    balance: 0,
  });
  const updateCart = () => {
    const storageCart = getStorageCart();
    setCarts(storageCart || []);
    const storageCartSum = getStorageCartSum();
    setCartSum({
      qty: storageCartSum.totalQty || 0,
      balance: storageCartSum.totalBalance || 0,
    });
  };
  useEffect(() => {
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);
  return (
    <>
      {/* card header */}
      <div className="bg-[#0178bd] p-2">
        <div className="text-2xl text-white text-center">Order</div>
      </div>
      {/* card body */}
      <div className="bg-white p-4 border-2 border-slate-200 h-[440px] overflow-y-auto">
        {carts.length >= 1 &&
          carts.map((el) => (
            <div className="mb-2" key={el.ProductId}>
              <div className="text-xl font-bold text-slate-800">
                {el.ProductName}
              </div>
              <div className="text-lg ms-2 text-slate-500">
                Price : {formatCurrency1(el.PriceSell)}
              </div>
              <div className="text-lg ms-2 text-slate-500">
                Qty : {el.ProductQty}
              </div>
            </div>
          ))}
        {carts.length < 1 && (
          <div className="flex flex-col h-full">
            <div className="text-2xl italic font-bold text-slate-500 m-auto">
              Order is Empty...
            </div>
          </div>
        )}
      </div>
      {/* card footer */}
      <div
        className={`p-2 rounded-b-2xl border-2 border-t-0 border-slate-200 ${
          carts.length >= 1 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={() => {
          carts.length >= 1 && setOpenModal(true);
        }}
      >
        <div className="px-5">
          <div className="flex items-center gap-3 justify-end">
            <FaCartShopping className="text-xl" />
            <div className="text-xl font-bold text-end mb-1">Total : </div>
          </div>
          <div className="text-xl text-end">
            {formatCurrency1(cartSum.balance)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardListOrder;
