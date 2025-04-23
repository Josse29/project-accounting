import React, { useEffect, useState } from "react";
import { NavigationContainer } from "../navigation";
import { FaCartShopping } from "react-icons/fa6";
import {
  CardImgProduct,
  PaginationProduct1,
  SearchProduct,
} from "../features/Product";
import { ModalCreateSale } from "../features/Stock";
import { Card1, Container } from "../components";
import { getProductRefStock } from "../utils";
import CardListOrder from "../features/Stock/CardListOrder";

const Order = () => {
  const [openModal, setOpenModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    searchVal: "",
    limitVal: 3,
    offsetVal: 1,
  });
  const [productStock, setProductStock] = useState([]);
  useEffect(() => {
    getProductRefStock({
      req,
      setTotalRows,
      setTotalPages,
      setProductStock,
    });
  }, []);
  return (
    <NavigationContainer>
      <Card1
        page="Order"
        icon={<FaCartShopping />}
        className="border-[#0178bd]"
      />
      <Container>
        <div className="flex gap-5">
          {/* first section */}
          <div className="w-[70%]">
            {/* search */}
            <div className="mb-8">
              <SearchProduct
                req={req}
                setReq={setReq}
                setTotalRows={setTotalRows}
                setTotalPages={setTotalPages}
                setProductStock={setProductStock}
                setLoading={setLoading}
              />
            </div>
            {/* loading */}
            {loading && (
              <div className="flex flex-col items-center h-[400px] justify-center">
                <div className="loader border-[10px] border-[#f3f3f3] border-t-[16px] border-t-[#0178bd] rounded-[50%] w-[175px] h-[175px] mb-4 block"></div>
                <div className="text-2xl italic font-bold">Loading....</div>
              </div>
            )}
            {/* card */}
            {!loading && totalRows >= 1 && (
              <div className="grid grid-cols-3 gap-5 mb-8">
                {productStock.map((el) => (
                  <CardImgProduct
                    key={el.ProductId}
                    productId={el.ProductId}
                    productName={el.ProductName}
                    productImg={el.ProductImage}
                    priceBuy={el.PriceBuy}
                    priceSell={el.PriceSell}
                    totalQty={el.TotalQty}
                  />
                ))}
              </div>
            )}
            {!loading && totalRows < 1 && (
              <div className="flex h-[400px]">
                <div className="text-2xl m-auto font-bold italic">
                  No product found...
                </div>
              </div>
            )}
            {/* pagination */}
            {!loading && (
              <div className="flex justify-center">
                <PaginationProduct1
                  req={req}
                  setReq={setReq}
                  totalPages={totalPages}
                  totalRows={totalRows}
                  setProductStock={setProductStock}
                />
              </div>
            )}
          </div>
          {/* second section */}
          <div className="w-[30%]">
            <CardListOrder setOpenModal={setOpenModal} />
          </div>
        </div>
      </Container>
      <ModalCreateSale
        openModal={openModal}
        setOpenModal={setOpenModal}
        setReq={setReq}
        setTotalPages={setTotalPages}
        setTotalRows={setTotalRows}
        setProductStock={setProductStock}
      />
    </NavigationContainer>
  );
};

export default Order;
