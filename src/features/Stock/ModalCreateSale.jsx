import React, { useEffect, useState } from "react";
import { Button, InputBalance1, Modal } from "../../components";
import { FaCalendar, FaCartShopping, FaClock } from "react-icons/fa6";
import {
  formatCurrency1,
  formatTime,
  formatTime1,
  getProductRefStock3,
  getStorageCart,
  getStorageCartSum,
  removeStorage,
  triggerStorage,
  unFormatCurrency,
} from "../../utils/";
import TableOrder from "./TableOrder";
import { SelectCustomer, SelectSale } from "../User";
import { createAccounting4API } from "../../services";
import Swal from "sweetalert2";

const ModalCreateSale = (props) => {
  const {
    openModal,
    setOpenModal,
    setReq,
    setTotalPages,
    setTotalRows,
    setProductStock,
  } = props;
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartSum, setCartSum] = useState({ qty: 0, balance: 0 });
  const handleChange = (e) => {
    const { name, options, selectedIndex } = e.target;
    if (name === "customer") {
      const selectedOption = options[selectedIndex];
      const customerName = selectedOption.getAttribute("data-customername");
      const customerEmail = selectedOption.getAttribute("data-customeremail");
      setFormData((prev) => ({
        ...prev,
        accountingCustomerNameVal: customerName,
        accountingCustomerEmailVal: customerEmail,
      }));
    } else if (name === "sale") {
      const selectedOption = options[selectedIndex];
      const saleName = selectedOption.text;
      setFormData((prev) => ({
        ...prev,
        accountingSaleNameVal: saleName,
      }));
    }
  };
  const [formData, setFormData] = useState({
    totalChange: "",
    totalPayment: "",
    accountingCustomerNameVal: "",
    accountingCustomerEmailVal: "",
    accountingSaleNameVal: "",
  });
  const updateTime = () => {
    const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
      formatTime();
    setDate(indonesianDate);
    setHour(indonesiaHour);
    setMinute(indonesiaMinute);
    setSecond(indonesiaSecond);
  };
  const cbCreate = async () => {
    setFormData({
      totalPayment: "",
      accountingCustomerNameVal: "",
      accountingCustomerEmailVal: "",
      accountingSaleNameVal: "",
    });
    removeStorage();
    triggerStorage();
    await getProductRefStock3({
      setReq,
      setProductStock,
      setTotalRows,
      setTotalPages,
    });
    Swal.fire({
      title: "Order Done !",
      icon: "success",
    });
    setOpenModal(false);
  };
  const calChange = () => {
    const totalChange = formatCurrency1(
      unFormatCurrency(formData.totalPayment) - cartSum.balance
    );
    setFormData((prev) => ({ ...prev, totalChange }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { yearNow, monthNow, dateNow, hourNow, minuteNow } = formatTime1();
      const carts = getStorageCart();
      for (const el of carts) {
        const {
          accountingCustomerNameVal,
          accountingCustomerEmailVal,
          accountingSaleNameVal,
        } = formData;
        const req = {
          accountingDateVal: `${yearNow}-${monthNow}-${dateNow}`,
          accountingTimeVal: `${hourNow}:${minuteNow}`,
          accountingProductIdVal: el.ProductId,
          accountingProductNameVal: el.ProductName,
          accountingProductQtyVal: el.ProductQty,
          accountingProductDiscountVal: 0,
          accountingBalanceTotalVal:
            parseFloat(el.PriceSell) * parseFloat(el.ProductQty),
          accountingCustomerNameVal,
          accountingCustomerEmailVal,
          accountingSaleNameVal,
          accountingInfoVal: "",
        };
        await createAccounting4API(req);
        await cbCreate();
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (openModal) {
      updateTime();
      const interval = setInterval(updateTime, 1000);
      const storageCartSum = getStorageCartSum();
      setCartSum({
        qty: storageCartSum.totalQty || 0,
        balance: storageCartSum.totalBalance || 0,
      });
      return () => clearInterval(interval);
    }
  }, [openModal]);
  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal} width="w-1/2">
      <Modal.Header
        icon={<FaCartShopping />}
        className="bg-[#0178bd]"
        headerText="Order"
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* date */}
          <div className="flex gap-2 justify-end items-center mb-1">
            <FaCalendar className="text-lg text-slate-700" />
            <div className="text-lg text-slate-700">{date}</div>
          </div>
          {/* time */}
          <div className="flex gap-2 justify-end items-center mb-1">
            <FaClock className="text-lg text-slate-700" />
            <div className="flex gap-2">
              <div className="text-lg text-slate-700">{hour} : </div>
              <div className="text-lg text-slate-700">{minute} : </div>
              <div className="text-lg text-slate-700">{second}</div>
            </div>
          </div>
          {/* sales & customer */}
          <div className="flex gap-3 mb-4">
            <div className="w-[230px]">
              <SelectSale
                setLoading={setLoading}
                name="sale"
                onChange={handleChange}
              />
            </div>
            <div className="w-[280px]">
              <SelectCustomer
                setLoading={setLoading}
                name="customer"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* table */}
          <div className="mb-3 overflow-x-auto">
            <TableOrder />
          </div>
          {/* payment */}
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label htmlFor="total" className="text-lg mb-1">
                Total Cash
              </label>
              <div className="text-lg mb-1">Total Payment</div>
              <div className="text-lg mb-1">Total Change </div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-lg mb-1 gap-2">
                <div>:</div>
                <InputBalance1
                  id="total"
                  name="totalPayment"
                  value={formData.totalPayment}
                  setFormData={setFormData}
                />
              </div>
              <div className="flex text-lg gap-2 mb-1">
                <div>:</div>
                <div>{formatCurrency1(cartSum.balance)}</div>
                <div
                  className="text-xl hover:cursor-pointer"
                  onClick={calChange}
                >
                  +
                </div>
              </div>
              <div className="flex text-lg gap-2 mb-1">
                <div>:</div>
                <div>{formData.totalChange}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Cancel"
            type="button"
            className="bg-red-500 hover:bg-red-600 hover:ring-[#f85858]"
            onClick={() => setOpenModal(false)}
          />
          <Button
            title={loading ? "wait..." : "Done"}
            type="submit"
            className={`bg-[#0178bd] ${
              loading
                ? "bg-opacity-65 cursor-not-allowed"
                : "hover:bg-[#1d73a5] hover:ring-[#58bdf8] cursor-pointer"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateSale;
