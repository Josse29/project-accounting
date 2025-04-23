import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  Button,
  InputBalance,
  InputDateTime,
  InputText,
  Modal,
  Select,
  TextArea,
} from "../../components";
import { getAccounting3, noNumberRgx, unFormatCurrency } from "../../utils";
import { OrderSum, SelectProduct } from "../Product";
import {
  SelectCreditor,
  SelectCustomer,
  SelectInvestor,
  SelectSale,
  SelectUser,
} from "../User";
import {
  createAccounting17API,
  createAccounting1API,
  createAccounting2API,
  createAccounting3API,
  createAccounting7API,
  createAccounting9API,
} from "../../services";
import InputCashAvailable from "./InputCashAvailable";
import { AllContext } from "../../context/AllProvider";

const ModalCreateAccounting1 = (props) => {
  const { getFinancialStatement } = useContext(AllContext);
  const {
    openCashOut,
    setOpenCashOut,
    setSuccessMsg,
    setReq,
    setAccounting,
    setTotalRows,
    setTotalPages,
  } = props;
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountingDateTime: "",
    accountingBalance: "",
    accountingInfo: "",
    assetName: "",
    assetType: 121,
    creditorName: "",
    customerName: "",
    customerEmail: "",
    expenseName: "",
    investorName: "",
    investorEmail: "",
    liabilityName: "",
    liabilityEmail: "",
    percent: "",
    productId: "",
    productName: "",
    productPriceBuy: 0,
    productPriceSell: 0,
    productQty: 0,
    userId: "",
    userName: "",
    userEmail: "",
    saleName: "",
  });
  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    if (name === "productId") {
      const selectedOption = options[selectedIndex];
      const productName = selectedOption.getAttribute("data-productname");
      const productPriceBuy = selectedOption.getAttribute(
        "data-productpricebuy"
      );
      const productPriceSell = selectedOption.getAttribute(
        "data-productpricesell"
      );
      const userEmail = selectedOption.getAttribute("data-productsupplier");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        productName,
        productPriceBuy,
        productPriceSell,
        userEmail,
      }));
    } else if (name === "productQty") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value.replace(noNumberRgx, "") || 0),
      }));
    } else if (name === "liabilityName") {
      const selectedOption = options[selectedIndex];
      const liabilityEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        liabilityName: value,
        liabilityEmail,
      }));
    } else if (name === "customerName") {
      const selectedOption = options[selectedIndex];
      const customerEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        customerName: value,
        customerEmail,
      }));
    } else if (name === "investorName") {
      const selectedOption = options[selectedIndex];
      const investorEmail = selectedOption.getAttribute("data-useremail");
      setFormData((prev) => ({
        ...prev,
        investorName: value,
        investorEmail,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
  const cbCreate = async (response) => {
    setSuccessMsg(response);
    setErrMsg("");
    await getAccounting3({
      setReq,
      setAccounting,
      setTotalRows,
      setTotalPages,
    });
    await getFinancialStatement();
    setFormData({
      accountingDateTime: "",
      accountingBalance: "",
      accountingInfo: "",
      assetName: "",
      assetType: 121,
      creditorName: "",
      customerName: "",
      expenseName: "",
      investorName: "",
      liabilityName: "",
      liabilityEmail: "",
      userId: "",
      userName: "",
      userEmail: "",
      productId: "",
      productName: "",
      productPriceBuy: 0,
      productPriceSell: 0,
      productQty: 0,
      saleName: "",
      percent: "",
    });
    setSelected("");
    setOpenCashOut(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        accountingBalance,
        accountingDateTime,
        accountingInfo,
        assetName,
        assetType,
        customerName,
        customerEmail,
        expenseName,
        investorName,
        investorEmail,
        liabilityName,
        liabilityEmail,
        percent,
        userEmail,
        userName,
        productId,
        productName,
        productPriceBuy,
        productPriceSell,
        productQty,
        saleName,
      } = formData;
      const [date, time] = accountingDateTime.split("T");
      // api/accounting-cash-out-asset-buy
      if (selected === "asset") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingAssetNameVal: assetName,
          accountingAssetTypeVal: assetType,
          accountingAssetPriceVal: unFormatCurrency(accountingBalance),
          accountingAssetEmail: userEmail,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting1API(req);
        await cbCreate(response);
      }
      // api/accounting/cash-out-product-buy
      if (selected === "product-buy") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingProductDiscountVal: percent.replace("%", "") || "",
          accountingBalanceTotalVal: productPriceBuy * productQty,
          accountingSupplierEmailVal: userEmail,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting2API(req);
        await cbCreate(response);
      }
      // api/accounting/cash-out-expense-buy
      if (selected === "expense") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingExpenseNameVal: expenseName,
          accountingExpensePriceVal: unFormatCurrency(accountingBalance),
          accountingExpenseEmailVal: userName,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting3API(req);
        await cbCreate(response);
      }
      // api/accounting/cash-out-liability
      if (selected === "liability") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingLiabilityNameVal: liabilityName,
          accountingLiabilityEmailVal: liabilityEmail,
          accountingBalanceTotalVal: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting7API(req);
        await cbCreate(response);
      }
      // api/accounting/return-product-sale
      if (selected === "return-product-sale") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingProductDiscountVal: percent.replace("%", ""),
          accountingBalanceTotalVal:
            parseFloat(productQty) * parseFloat(productPriceSell),
          accountingCustomerNameVal: customerName,
          accountingCustomerEmailVal: customerEmail,
          accountingSaleNameVal: saleName,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting9API(req);
        await cbCreate(response);
      }
      // api/accounting/cash-out-withdrawl-investment
      if (selected === "withdrawl-investment") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingInvestorNameVal: investorName,
          accountingInvestorEmailVal: investorEmail,
          accountingBalanceVal: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting17API(req);
        await cbCreate(response);
      }
    } catch (error) {
      setErrMsg(error.message.split(":")[2] || error);
      setSuccessMsg("");
      scrollToTop();
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={openCashOut} width="w-[540px]">
      <Modal.Header headerText="Cash Out" className="bg-[#e11d48]" />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* input & date */}
          <div className="mb-5">
            <InputDateTime
              title="Date & Time :"
              className="focus:ring-red-500"
              htmlForId="accounting-date"
              value={formData.accountingDateTime}
              name="accountingDateTime"
              onChange={handleChange}
            />
          </div>
          {/* select method */}
          <div className="mb-5">
            <Select.Label title="Select Method" htmlFor="accounting-method" />
            <Select
              className="w-full focus:ring-red-500"
              id="accounting-method"
              onChange={(e) => setSelected(e.target.value)}
            >
              <Select.Option value="null" title="Choose One Of Method" />
              <Select.Option value="asset" title="Payment of Purchase Asset" />
              <Select.Option
                value="product-buy"
                title="Payment of Purchase Product"
              />
              <Select.Option value="expense" title="Payment of Expense" />
              <Select.Option value="liability" title="Payment of Creditor" />
              <Select.Option
                value="return-product-sale"
                title="Payment of Return Sale Product"
              />
              <Select.Option
                value="withdrawl-investment"
                title="Withdraw Cash Investor"
              />
            </Select>
          </div>
          {/* cash-available */}
          <div className="mb-5">
            <InputCashAvailable setLoading={setLoading} />
          </div>
          {/* selected */}
          <div className="mb-5">
            {/* api/accounting/cash-out-asset-buy */}
            {selected === "asset" && (
              <>
                {/* asset-name */}
                <div className="mb-5">
                  <InputText
                    title="Asset Name"
                    htmlFor1="asset-name"
                    className="focus:ring-red-500 capitalize"
                    name="assetName"
                    onChange={handleChange}
                    placeholder="Ex : Asset, Land, Etc"
                  />
                </div>
                {/* asset-type */}
                <div className="mb-5">
                  <Select.Label title="Asset Type" htmlFor="asset-type" />
                  <Select
                    className="w-full focus:ring-red-500"
                    id="asset-type"
                    onChange={handleChange}
                    name="assetType"
                    value={formData.assetType}
                  >
                    <Select.Option title="Fixed Asset" value="121" />
                    <Select.Option title="Current Asset" value="113" />
                  </Select>
                </div>
                {/* asset price sell */}
                <div className="mb-5">
                  <InputBalance
                    title="Asset Price Sell"
                    htmlFor1="accounting-balance"
                    className="focus:ring-red-500"
                    name="accountingBalance"
                    value={formData.accountingBalance}
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* userEmail */}
                <div className="mb-5">
                  <SelectUser
                    onChange={handleChange}
                    name="userEmail"
                    value={formData.userEmail}
                    className="focus:ring-red-500"
                    setLoading={setLoading}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-red-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-out-product-buy */}
            {selected === "product-buy" && (
              <>
                {/* Product */}
                <div className="mb-5">
                  <SelectProduct
                    title="buy"
                    className="focus:ring-red-500"
                    value={formData.productId}
                    name="productId"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* order summary  */}
                {formData.productId !== "" && (
                  <OrderSum
                    title="buy"
                    setFormData={setFormData}
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-red-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-out-expense */}
            {selected === "expense" && (
              <>
                {/* expense-name */}
                <div className="mb-5">
                  <InputText
                    title="Expense Name"
                    htmlFor1="expense-name"
                    id="expense-name"
                    className="focus:ring-red-500 capitalize"
                    value={formData.expenseName}
                    onChange={handleChange}
                    name="expenseName"
                    placeholder="Ex : Advertising Expense, Etc"
                  />
                </div>
                {/* expense-price */}
                <div className="mb-5">
                  <InputBalance
                    title="Expense Balance"
                    htmlFor1="accounting-balance"
                    className="focus:ring-red-500"
                    value={formData.accountingBalance}
                    name="accountingBalance"
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-red-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-out-liability*/}
            {selected === "liability" && (
              <>
                {/* select creditor */}
                <div className="mb-5">
                  <SelectCreditor
                    className="focus:ring-red-500"
                    name="liabilityName"
                    value={formData.liabilityName}
                    onChange={handleChange}
                  />
                </div>
                {/* balance */}
                <div className="mb-5">
                  <InputBalance
                    title="Balance"
                    htmlFor1="accounting-balance"
                    className="focus:ring-red-500"
                    value={formData.accountingBalance}
                    name="accountingBalance"
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-red-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-out-return-product-sale */}
            {selected === "return-product-sale" && (
              <>
                {/* Product */}
                <div className="mb-5">
                  <SelectProduct
                    title="sell"
                    className="focus:ring-red-500"
                    value={formData.productId}
                    name="productId"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* order sum */}
                {formData.productId !== "" && (
                  <OrderSum
                    title="sell"
                    setFormData={setFormData}
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {/* Customer */}
                <div className="mb-5">
                  <SelectCustomer
                    className="focus:ring-red-500"
                    value={formData.customerName}
                    name="customerName"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* Sale */}
                <div className="mb-5">
                  <SelectSale
                    className="focus:ring-red-500"
                    value={formData.saleName}
                    name="saleName"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-red-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-out-withdrawl-investment */}
            {selected === "withdrawl-investment" && (
              <>
                {/* investor */}
                <div className="mb-5">
                  <SelectInvestor
                    className="focus:ring-red-500"
                    value={formData.investorName}
                    name="investorName"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* withdraw balance */}
                <div className="mb-5">
                  <InputBalance
                    title="Balance Withdraw"
                    htmlFor1="accounting-balance"
                    className="focus:ring-red-500"
                    value={formData.accountingBalance}
                    name="accountingBalance"
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-red-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            title="Cancel"
            onClick={() => setOpenCashOut(false)}
            className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
          />
          <Button
            type="submit"
            title="Done"
            className={`bg-[#e11d48] hover:bg-[#cb1b41] hover:ring-red-600 ${
              loading && "cursor-not-allowed bg-opacity-65 hover:ring-red-200"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateAccounting1;
