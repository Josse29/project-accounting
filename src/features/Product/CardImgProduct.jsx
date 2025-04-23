import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import CardImg from "../../components/CardImg";
import {
  formatCurrency1,
  getStorageCart,
  setStorageCart,
  setStorageCartSum,
  triggerStorage,
} from "../../utils";
import { Button } from "../../components";
import { NoImg } from "../../assets/";
const CardImgProduct = (props) => {
  const { productId, productName, productImg, priceBuy, priceSell, totalQty } =
    props;
  const [qty, setQty] = useState(0);
  const handleQtyChange = (delta, productId, productName, priceSell) => {
    const cart = getStorageCart();
    if (delta === 1) {
      const productIndex = cart.findIndex((el) => el.ProductId === productId);
      if (productIndex !== -1) {
        cart[productIndex].ProductQty += 1;
      } else {
        cart.push({
          ProductId: productId,
          ProductName: productName,
          PriceSell: priceSell,
          ProductQty: 1,
        });
      }
      setStorageCart(cart);
      setStorageCartSum(cart);
      triggerStorage();
    }
    if (delta === -1) {
      const productIndex = cart.findIndex((el) => el.ProductId === productId);
      if (productIndex !== -1) {
        if (cart[productIndex].ProductQty > 0) {
          cart[productIndex].ProductQty -= 1;
        }
        if (cart[productIndex].ProductQty <= 0) {
          cart.splice(productIndex, 1);
        }
      }
      setStorageCart(cart);
      setStorageCartSum(cart);
      triggerStorage();
    }
  };
  const updateQtyFromStorage = () => {
    const cart = getStorageCart();
    const product = cart.find((p) => p.ProductId === productId);
    setQty(product?.ProductQty || 0);
  };
  useEffect(() => {
    updateQtyFromStorage();
    window.addEventListener("storage", updateQtyFromStorage);
    return () => window.removeEventListener("storage", updateQtyFromStorage);
  }, [productId]);
  return (
    <CardImg>
      <CardImg.HeaderImg
        imgSrc={productImg !== "" ? productImg : NoImg}
        alt="product"
      />
      <CardImg.Body>
        <div className="text-2xl font-bold tracking-tight text-gray-900 mb-1 capitalize">
          {productName}
        </div>
        <div className="text-xl font-normal text-gray-700 mb-1">
          {formatCurrency1(priceSell)}
        </div>
        <div className="text-xl font-normal text-gray-700 mb-2">
          Stock : {totalQty}
        </div>
        <div className="flex justify-between">
          {/* btn qty */}
          <div>
            {qty >= 1 && (
              <div className="w-[40px] h-[40px] bg-[#0178bd] flex items-center justify-center rounded-full">
                <div className="text-2xl text-white">{qty}</div>
              </div>
            )}
          </div>
          {/* btn minus and plus */}
          <div className="flex gap-2">
            {/* btn minus  */}
            <Button
              title={<FaMinus className="text-xl text-white" />}
              className={`bg-red-600 ${
                qty <= 0
                  ? "cursor-not-allowed bg-opacity-60"
                  : "hover:bg-red-700 hover:ring-red-700"
              } `}
              onClick={() => {
                handleQtyChange(-1, productId, productName, priceSell);
              }}
              disabled={qty <= 0 ? true : false}
            />
            {/* btn plus */}
            <Button
              title={<FaPlus className="text-xl text-white" />}
              disabled={qty >= totalQty ? true : false}
              className={`bg-green-500 ${
                qty >= totalQty
                  ? "cursor-not-allowed bg-opacity-60"
                  : "hover:bg-green-600 hover:ring-green-700"
              } `}
              onClick={() => {
                handleQtyChange(+1, productId, productName, priceSell);
              }}
            />
          </div>
        </div>
      </CardImg.Body>
    </CardImg>
  );
};

export default CardImgProduct;
