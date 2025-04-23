import React, { useContext, useRef, useState } from "react";
import { AllContext } from "../../context/AllProvider";
import {
  Alert,
  Button,
  InputBalance,
  InputDateTime,
  InputPercent1,
  InputText,
  Modal,
  Select,
  TextArea,
} from "../../components";
import {
  SelectCreditor,
  SelectCustomer,
  SelectInvestor,
  SelectReceivable,
  SelectSale,
  SelectUser,
} from "../User";
import { OrderSum, SelectProduct } from "../Product";
import { getAccounting3, noNumberRgx, unFormatCurrency } from "../../utils";
import { FaSquarePlus } from "react-icons/fa6";
import SelectAsset from "./SelectAsset";
import {
  createAccounting13API,
  createAccounting15API,
  createAccounting16API,
  createAccounting4API,
  createAccounting6API,
  createAccounting8API,
  createAccountingAPI,
} from "../../services";

const ModalCreateAccounting = (props) => {
  const { getFinancialStatement } = useContext(AllContext);
  const {
    openCashIn,
    setOpenCashIn,
    setSuccessMsg,
    setReq,
    setAccounting,
    setTotalRows,
    setTotalPages,
  } = props;
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    accountingBalance: "",
    accountingDateTime: "",
    accountingInfo: "",
    assetName: "",
    assetType: "",
    assetPrice: "",
    creditorName: "",
    customerName: "",
    customerEmail: "",
    investorBalance: "",
    investorEmail: "",
    investorName: "",
    liabilityName: "",
    liabilityEmail: "",
    percent: "",
    productId: "",
    productName: "",
    productPriceBuy: 0,
    productPriceSell: 0,
    productQty: 0,
    productSupplier: "",
    productSupplierEmail: "",
    receivableName: "",
    receivableEmail: "",
    saleName: "",
    userName: "",
    userEmail: "",
    title: "",
  });
  const modalBodyRef = useRef(null);
  const scrollToTop = () => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    if (name === "investorName") {
      const selectedOption = options[selectedIndex];
      const investorBalance = selectedOption.getAttribute("data-userfullname");
      const investorEmail = selectedOption.getAttribute("data-useremail");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        investorBalance,
        investorEmail,
      }));
    } else if (name === "productId") {
      const selectedOption = options[selectedIndex];
      const productName = selectedOption.getAttribute("data-productname");
      const productPriceBuy = selectedOption.getAttribute(
        "data-productpricebuy"
      );
      const productPriceSell = selectedOption.getAttribute(
        "data-productpricesell"
      );
      const productSupplier = selectedOption.getAttribute("data-fullname");
      const productSupplierEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        productId: value,
        productName,
        productPriceBuy,
        productPriceSell,
        productSupplier,
        productSupplierEmail,
      }));
    } else if (name === "productQty") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value.replace(noNumberRgx, "") || 0),
      }));
    } else if (name === "customerName") {
      const selectedOption = options[selectedIndex];
      const customerEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        customerName: value,
        customerEmail,
      }));
    } else if (name === "liabilityName") {
      const selectedOption = options[selectedIndex];
      const liabilityEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        liabilityName: value,
        liabilityEmail,
      }));
    } else if (name === "receivableName") {
      const selectedOption = options[selectedIndex];
      const receivableEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        receivableName: value,
        receivableEmail,
      }));
    } else if (name === "assetName") {
      const selectedOption = options[selectedIndex];
      const assetPrice = selectedOption.getAttribute("data-price");
      const assetType = selectedOption.getAttribute("data-type");
      setFormData((prev) => ({
        ...prev,
        assetName: value,
        assetType,
        assetPrice,
      }));
    } else if (name === "userName") {
      const selectedOption = options[selectedIndex];
      const userEmail = selectedOption.getAttribute("data-email");
      setFormData((prev) => ({
        ...prev,
        userName: value,
        userEmail,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const cbCreate = async (response) => {
    setSuccessMsg(response);
    setErrMsg("");
    await getFinancialStatement();
    await getAccounting3({
      setReq,
      setAccounting,
      setTotalRows,
      setTotalPages,
    });
    setFormData({
      accountingBalance: "",
      accountingDateTime: "",
      accountingInfo: "",
      assetName: "",
      assetType: "",
      assetPrice: "",
      creditorName: "",
      customerName: "",
      customerEmail: "",
      investorBalance: "",
      investorEmail: "",
      investorName: "",
      liabilityName: "",
      liabilityEmail: "",
      percent: "",
      productId: "",
      productName: "",
      productPriceBuy: 0,
      productPriceSell: 0,
      productQty: 0,
      productSupplier: "",
      productSupplierEmail: "",
      receivableName: "",
      receivableEmail: "",
      saleName: "",
      userName: "",
      userEmail: "",
      title: "",
    });
    setSelected("");
    setOpenCashIn(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        accountingBalance,
        accountingInfo,
        assetName,
        assetPrice,
        assetType,
        customerEmail,
        customerName,
        investorEmail,
        investorName,
        liabilityEmail,
        liabilityName,
        percent,
        productId,
        productName,
        productPriceBuy,
        productPriceSell,
        productQty,
        productSupplier,
        productSupplierEmail,
        receivableEmail,
        receivableName,
        saleName,
        userEmail,
        userName,
        title,
      } = formData;
      const [date, time] = formData.accountingDateTime.split("T");
      /* api/accounting/cash-in-investment */
      if (selected === "investor") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingInvestorNameVal: investorName,
          accountingInvestorEmailVal: investorEmail,
          accountingBalanceVal: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccountingAPI(req);
        await cbCreate(response);
      }
      /* api/accounting/cash-in-product-sale */
      if (selected === "product-sale") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingProductDiscountVal: percent.replace("%", "") || "",
          accountingBalanceTotalVal: productPriceSell * productQty,
          accountingCustomerNameVal: customerName,
          accountingCustomerEmailVal: customerEmail,
          accountingSaleNameVal: saleName,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting4API(req);
        await cbCreate(response);
      }
      /* api/accounting/cash-in-liability */
      if (selected === "liability") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingLiabilityNameVal: liabilityName,
          accountingLiabilityEmailVal: liabilityEmail,
          accountingBalanceTotalVal: unFormatCurrency(accountingBalance),
          accountingLiabilityInterestVal: percent.replace("%", "") || "",
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting6API(req);
        await cbCreate(response);
      }
      /* api/accounting/cash-in-receivable */
      if (selected === "receivable") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingReceivableNameVal: receivableName,
          accountingReceivableEmailVal: receivableEmail,
          accountingBalanceTotalVal: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting8API(req);
        await cbCreate(response);
      }
      /* api/accounting/cash-in-return-product-buy */
      if (selected === "return-product-buy") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingProductInterestVal: percent.replace("%", ""),
          accountingBalanceTotalVal:
            parseFloat(productQty) * parseFloat(productPriceBuy),
          accountingSupplierEmailVal: productSupplierEmail,
          accountingSupplierNameVal: productSupplier,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting13API(req);
        await cbCreate(response);
      }
      /* api/accounting/cash-in-asset-sell */
      if (selected === "asset-sell") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingAssetNameVal: assetName,
          accountingAssetPriceBuyVal: assetPrice,
          accountingAssetPriceSellVal: unFormatCurrency(accountingBalance),
          accountingAssetTypeVal: assetType,
          accountingAssetEmailVal: userEmail,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting15API(req);
        await cbCreate(response);
      }
      /* api/accounting/cash-in-from-others */
      if (selected === "others") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingNameVal: title,
          accountingBalanceVal: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting16API(req);
        await cbCreate(response);
      }
    } catch (error) {
      console.error(error);
      setErrMsg(error.message.split(":")[2] || error);
      setSuccessMsg("");
      scrollToTop();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal openModal={openCashIn} width="w-[570px]">
      <Modal.Header
        className="bg-[#119687]"
        headerText="Cash - In"
        icon={<FaSquarePlus />}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* date & time */}
          <div className="mb-5">
            <InputDateTime
              title="Date & Time :"
              className="focus:ring-green-500"
              htmlForId="accounting-date"
              value={formData.accountingDateTime}
              name="accountingDateTime"
              onChange={handleChange}
            />
          </div>
          {/* method */}
          <div className="mb-5">
            <Select.Label title="Method" htmlFor="accounting-method" />
            <Select
              className="w-full focus:ring-green-500"
              id="accounting-method"
              onInput={(e) => {
                setSelected(e.target.value);
              }}
            >
              <Select.Option value="null" title="Choose One Of Method" />
              <Select.Option
                value="investor"
                title="Receipt Cash From Investor"
              />
              <Select.Option
                value="product-sale"
                title="Receipt Cash From Sale Product"
              />
              <Select.Option
                value="liability"
                title="Receipt Cash From Creditor"
              />
              <Select.Option
                value="receivable"
                title="Receipt Cash From Receivable"
              />
              <Select.Option
                value="return-product-buy"
                title="Receipt Cash From Return Buy Product"
              />
              <Select.Option
                value="asset-sell"
                title="Receipt Cash From Sale Asset"
              />
              <Select.Option value="others" title="Receipt Cash From Others" />
            </Select>
          </div>
          {/* selected */}
          <div className="mb-5">
            {/* api/accounting/cash-in-investment */}
            {selected === "investor" && (
              <>
                {/* investor */}
                <div className="mb-5">
                  <SelectInvestor
                    className="focus:ring-green-500"
                    name="investorName"
                    onChange={handleChange}
                    value={formData.investorName}
                    setLoading={setLoading}
                  />
                </div>
                {/* balance */}
                <div className="mb-5">
                  <InputBalance
                    title="Balance"
                    htmlFor1="accounting-balance"
                    className="focus:ring-green-500"
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
                    className="focus:ring-green-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-in-product-sale */}
            {selected === "product-sale" && (
              <>
                {/* Product */}
                <div className="mb-5">
                  <SelectProduct
                    title="sell"
                    className="focus:ring-green-500"
                    value={formData.productId}
                    name="productId"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* qty & total */}
                {formData.productId !== "" && (
                  <div className="mb-5">
                    <OrderSum
                      title="sell"
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                )}
                {/* Customer */}
                <div className="mb-5">
                  <SelectCustomer
                    className="focus:ring-green-500"
                    value={formData.customerName}
                    name="customerName"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* Sale */}
                <div className="mb-5">
                  <SelectSale
                    className="focus:ring-green-500"
                    value={formData.saleName}
                    name="saleName"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* information */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-green-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-in-liability */}
            {selected === "liability" && (
              <>
                {/* liability */}
                <div className="mb-5">
                  <SelectCreditor
                    className="focus:ring-green-500"
                    value={formData.liabilityName}
                    name="liabilityName"
                    onChange={handleChange}
                  />
                </div>
                {/* balance */}
                <div className="mb-5">
                  <InputBalance
                    title="Balance"
                    htmlFor1="accounting-balance"
                    className="focus:ring-green-500"
                    value={formData.accountingBalance}
                    name="accountingBalance"
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* interest */}
                <div className="mb-5">
                  <InputPercent1
                    title="Interest"
                    className="focus:ring-green-500"
                    htmlForId="interest"
                    value={formData.percent}
                    name="percent"
                    placeholder="0%"
                    setFormData={setFormData}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-green-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-in-receivable */}
            {selected === "receivable" && (
              <>
                {/* receivable */}
                <div className="mb-5">
                  <SelectReceivable
                    className="focus:ring-green-500"
                    value={formData.receivableName}
                    name="receivableName"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* balance */}
                <div className="mb-5">
                  <InputBalance
                    title="Balance"
                    htmlFor1="accounting-balance"
                    className="focus:ring-green-500"
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
                    className="focus:ring-green-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-in-return-product-buy */}
            {selected === "return-product-buy" && (
              <>
                {/* Product */}
                <div className="mb-5">
                  <SelectProduct
                    title="buy"
                    className="focus:ring-green-500"
                    value={formData.productId}
                    name="productId"
                    onChange={handleChange}
                    setLoading={setLoading}
                  />
                </div>
                {/* order sum qty */}
                {formData.productId !== "" && (
                  <div className="mb-5">
                    <OrderSum
                      title="buy"
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  </div>
                )}
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-green-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-in-asset-sell */}
            {selected === "asset-sell" && (
              <>
                {/* asset name */}
                <div className="mb-5">
                  <SelectAsset
                    className="focus:ring-green-500"
                    onChange={handleChange}
                    name="assetName"
                    value={formData.assetName}
                    setLoading={setLoading}
                  />
                </div>
                {/* asset price sell */}
                <div className="mb-5">
                  <InputBalance
                    title="Asset Price Sell"
                    htmlFor1="accounting-balance"
                    className="focus:ring-green-500"
                    value={formData.accountingBalance}
                    name="accountingBalance"
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* contact person */}
                <div className="mb-5">
                  <SelectUser
                    onChange={handleChange}
                    name="userName"
                    value={formData.userName}
                    className="focus:ring-green-500"
                    setLoading={setLoading}
                  />
                </div>
                {/* info */}
                <div className="mb-5">
                  <TextArea
                    title="More Information"
                    htmlFor1="accounting-info"
                    className="focus:ring-green-500"
                    value={formData.accountingInfo}
                    name="accountingInfo"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* api/accounting/cash-in-from-others */}
            {selected === "others" && (
              <>
                {/* title */}
                <div className="mb-5">
                  <InputText
                    title="Title"
                    htmlFor1="cash-name"
                    className="focus:ring-green-500 capitalize"
                    onChange={handleChange}
                    name="title"
                    value={formData.title}
                    placeholder="Ex : Donation from Government"
                  />
                </div>
                {/* accountingBalance */}
                <div className="mb-5">
                  <InputBalance
                    title="Balance"
                    htmlFor1="accounting-balance"
                    className="focus:ring-green-500"
                    value={formData.accountingBalance}
                    name="accountingBalance"
                    placeholder="Ex : $ 10.000"
                    setFormData={setFormData}
                  />
                </div>
                {/* more information */}
                <div className="mb-5">
                  <TextArea
                    className="focus:ring-green-500"
                    title="More Information"
                    htmlFor1="accounting-info"
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
            title="Cancel"
            type="button"
            className="bg-red-600 hover:bg-red-700 hover:ring-2 hover:ring-red-500"
            onClick={() => setOpenCashIn(false)}
          />
          <Button
            title="Done"
            type="submit"
            className={`bg-[#119687] hover:ring-[#0f8174] ${
              loading
                ? "cursor-not-allowed bg-opacity-50"
                : "cursor-pointer hover:bg-[#0f8274]"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateAccounting;
