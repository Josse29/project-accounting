import React, { useContext, useRef, useState } from "react";
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
import { getAccounting3, noNumberRgx, unFormatCurrency } from "../../utils";
import {
  SelectCustomer,
  SelectInvestor,
  SelectSale,
  SelectUser,
} from "../User";
import { OrderSum, SelectProduct } from "../Product";
import SelectAsset from "./SelectAsset";
import {
  createAccounting10API,
  createAccounting11API,
  createAccounting12API,
  createAccounting14API,
  createAccounting18API,
  createAccounting19API,
  createAccounting20API,
  createAccounting21API,
  createAccounting5API,
} from "../../services";
import { AllContext } from "../../context/AllProvider";

const ModalCreateAccounting2 = (props) => {
  const { getFinancialStatement } = useContext(AllContext);
  const {
    openEtc,
    setOpenEtc,
    setSuccessMsg,
    setAccounting,
    setReq,
    setTotalRows,
    setTotalPages,
  } = props;
  const [selected, setSelected] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountingDateTime: "",
    accountingBalance: "",
    accountingInfo: "",
    assets: "",
    assetName: "",
    assetType: 121,
    assetPrice: "",
    customerName: "",
    customerEmail: "",
    investorName: "",
    investorEmail: "",
    percent: "",
    productId: "",
    productName: "",
    productPriceBuy: 0,
    productPriceSell: 0,
    productSupplier: "",
    productSupplierEmail: "",
    productQty: 0,
    saleName: "",
    userName: "",
    userEmail: "",
  });
  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    if (name === "productId") {
      const selectedOption = options[selectedIndex];
      const productName = selectedOption.getAttribute("data-productname");
      const productPriceSell = selectedOption.getAttribute(
        "data-productpricesell"
      );
      const productPriceBuy = selectedOption.getAttribute(
        "data-productpricebuy"
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
    } else if (name === "investorName") {
      const selectedOption = options[selectedIndex];
      const investorEmail = selectedOption.getAttribute("data-useremail");
      setFormData((prev) => ({
        ...prev,
        investorName: value,
        investorEmail,
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
  const modalBodyRef = useRef(null);
  const scrollToTop = () => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const cbSubmit = async (res) => {
    setSuccessMsg(res);
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
      assetType: "",
      customerName: "",
      customerEmail: "",
      percent: "",
      investorName: "",
      productId: "",
      productName: "",
      productPriceBuy: 0,
      productPriceSell: 0,
      productQty: 0,
      saleName: "",
      userName: "",
    });
    setErrMsg("");
    setSelected("");
    setOpenEtc(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        accountingDateTime,
        accountingBalance,
        accountingInfo,
        assets,
        assetName,
        assetType,
        assetPrice,
        customerName,
        customerEmail,
        investorName,
        investorEmail,
        percent,
        productId,
        productName,
        productSupplier,
        productSupplierEmail,
        productPriceBuy,
        productPriceSell,
        productQty,
        saleName,
        userName,
        userEmail,
      } = formData;
      const [date, time] = accountingDateTime.split("T");
      // api/accounting/etc-investment-asset
      if (selected === "invest-asset") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingInvestorNameVal: investorName,
          accountingInvestorEmailVal: investorEmail,
          accountingAssetTypeVal: assetType,
          accountingAssetNameVal: assets,
          accountingAssetPriceVal: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting10API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-asset-buy-credit
      if (selected === "buy-asset-credit") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingAssetNameVal: assets,
          accountingAssetTypeVal: assetType,
          accountingAssetPriceVal: unFormatCurrency(accountingBalance),
          accountingAssetInterestVal: percent.replace("%", "") || "",
          accountingUserFullnameVal: userName,
          accountingUserEmailVal: "userEmail",
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting18API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-product-buy-credit
      if (selected === "buy-product-credit") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingProductInterestVal: percent.replace("%", ""),
          accountingBalanceTotalVal:
            parseFloat(productQty) * parseFloat(productPriceBuy),
          accontingSupplierEmailVal: productSupplierEmail,
          accountingSupplierNameVal: productSupplier,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting11API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-product-sale-credit
      if (selected === "sale-product-credit") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingBalanceTotalVal:
            parseFloat(productPriceSell) * parseFloat(productQty),
          accountingProductInterestVal: percent.replace("%", "") || "",
          accountingCustomerNameVal: customerName,
          accountingCustomerEmailVal: customerEmail,
          accountingSaleNameVal: saleName,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting5API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-asset-sale-credit
      if (selected === "sale-asset-credit") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingAssetNameVal: assetName,
          accountingAssetTypeVal: assetType,
          accountingAssetBalanceVal: assetPrice,
          accountingAssetPriceSellVal: unFormatCurrency(accountingBalance),
          accountingSupplierFullnameVal: userName,
          accountingSupplierEmailVal: userEmail,
          accountingAssetInterestVal: percent,
          accountingAssetInfoVal: accountingInfo,
        };
        const response = await createAccounting21API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-accumulation-asset
      if (selected === "accumulated-asset") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingAssetNameVal: assetName,
          accountingAssetTypeVal: assetType,
          accountingAssetPriceVal: assetPrice,
          accountingAssetValueUse: unFormatCurrency(accountingBalance),
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting14API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-withdrawl-investment-asset
      if (selected === "withdrawl-asset-investor") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingInvestorNameVal: investorName,
          accountingInvestorEmailVal: investorEmail,
          accountingAssetTypeVal: assetType,
          accountingAssetNameVal: assetName,
          accountingAssetPriceVal: assetPrice,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting20API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-return-product-buy-credit
      if (selected === "return-purchase-product-credit") {
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
        const response = await createAccounting12API(req);
        await cbSubmit(response);
      }
      // api/accounting/etc-return-product-sale-credit
      if (selected === "return-sale-product-credit") {
        const req = {
          accountingDateVal: date,
          accountingTimeVal: time,
          accountingProductIdVal: productId,
          accountingProductNameVal: productName,
          accountingProductQtyVal: productQty,
          accountingBalanceTotalVal:
            parseFloat(productQty) * parseFloat(productPriceSell),
          accountingProductInterestVal: percent.replace("%", "") || "",
          accountingCustomerNameVal: customerName,
          accountingCustomerEmailVal: customerEmail,
          accountingSaleNameVal: saleName,
          accountingInfoVal: accountingInfo,
        };
        const response = await createAccounting19API(req);
        await cbSubmit(response);
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
    <Modal openModal={openEtc} width="w-[540px]">
      <Modal.Header headerText="Etc" className="bg-[#612bde]" />
      <form onSubmit={handleSubmit}>
        <Modal.Body ref={modalBodyRef}>
          {/* alert */}
          <Alert.Failed errMsg={errMsg} setErrMsg={setErrMsg} />
          {/* date & time */}
          <div className="mb-5">
            <InputDateTime
              title="Date & Time :"
              className="focus:ring-violet-500"
              htmlForId="accounting-date"
              value={formData.accountingDateTime}
              name="accountingDateTime"
              onChange={handleChange}
            />
          </div>
          {/* select */}
          <div className="mb-5">
            <Select.Label title="Method" htmlFor="accounting-method" />
            <Select
              id="accounting-method"
              className="w-full focus:ring-violet-500"
              onChange={(e) => setSelected(e.target.value)}
            >
              <Select.Option title="Choose One Of Method" value="null" />
              <Select.Option
                title="Investment With Asset"
                value="invest-asset"
              />
              <Select.Option
                title="Buy Asset On Credit"
                value="buy-asset-credit"
              />
              <Select.Option
                title="Buy Product On Credit"
                value="buy-product-credit"
              />
              <Select.Option
                title="Sale Product On Credit"
                value="sale-product-credit"
              />
              <Select.Option
                title="Sale Asset On Credit"
                value="sale-asset-credit"
              />
              <Select.Option
                title="Accumulated Net Value of Asset"
                value="accumulated-asset"
              />
              <Select.Option
                title="Withdrawl Asset Investor"
                value="withdrawl-asset-investor"
              />
              <Select.Option
                title="Return Purchase Product On Credit"
                value="return-purchase-product-credit"
              />
              <Select.Option
                title="Return Sale Product On Credit"
                value="return-sale-product-credit"
              />
            </Select>
          </div>
          {/* api/accounting/etc-investment-asset */}
          {selected === "invest-asset" && (
            <>
              {/* assetName */}
              <div className="mb-5">
                <InputText
                  title="Asset Name"
                  className="capitalize focus:ring-violet-500"
                  htmlFor1="asset-name"
                  placeholder="Ex : Land, Building, etc"
                  name="assets"
                  value={formData.assets}
                  onChange={handleChange}
                />
              </div>
              {/* assetType */}
              <div className="mb-5">
                <Select.Label title="Asset Type" htmlFor="asset-type" />
                <Select
                  className="w-full focus:ring-violet-500"
                  id="asset-type"
                  name="assetType"
                  onChange={handleChange}
                  value={formData.assetType}
                >
                  <Select.Option title="Fixed Asset" value="121" defaultValue />
                  <Select.Option title="Current Asset" value="113" />
                </Select>
              </div>
              {/* assetPrice */}
              <div className="mb-5">
                <InputBalance
                  title="Asset Price"
                  htmlFor1="asset-price"
                  className="focus:ring-violet-500"
                  name="accountingBalance"
                  value={formData.accountingBalance}
                  placeholder="Ex : $ 10.000"
                  setFormData={setFormData}
                />
              </div>
              {/* investor */}
              <div className="mb-5">
                <SelectInvestor
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.investorName}
                  name="investorName"
                  setLoading={setLoading}
                />
              </div>
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.accountingInfo}
                  name="accountingInfo"
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-asset-buy-credit */}
          {selected === "buy-asset-credit" && (
            <>
              {/* assetName */}
              <div className="mb-5">
                <InputText
                  title="Asset Name"
                  onChange={handleChange}
                  name="assets"
                  value={formData.assets}
                  className="capitalize focus:ring-violet-500"
                  htmlFor1="asset-name"
                  placeholder="Ex : Land, Building, etc"
                />
              </div>
              {/* assetType */}
              <div className="mb-5">
                <Select.Label title="Asset Type" htmlFor="asset-type" />
                <Select
                  className="w-full focus:ring-violet-500"
                  id="asset-type"
                  name="assetType"
                  onChange={handleChange}
                  value={formData.assetType}
                >
                  <Select.Option title="Fixed Asset" value="121" defaultValue />
                  <Select.Option title="Current Asset" value="113" />
                </Select>
              </div>
              {/* assetPrice */}
              <div className="mb-5">
                <InputBalance
                  title="Asset Price"
                  htmlFor1="asset-price"
                  className="focus:ring-violet-500"
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
                  htmlForId="interest"
                  className="focus:ring-violet-500"
                  name="percent"
                  value={formData.percent}
                  setFormData={setFormData}
                />
              </div>
              {/* user */}
              <div className="mb-5">
                <SelectUser
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.userName}
                  name="userName"
                  setLoading={setLoading}
                />
              </div>
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.accountingInfo}
                  name="accountingInfo"
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-product-buy-credit */}
          {selected === "buy-product-credit" && (
            <>
              {/* product-name */}
              <div className="mb-5">
                <SelectProduct
                  title="buy"
                  className="focus:ring-violet-500"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* order sum */}
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
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.accountingInfo}
                  name="accountingInfo"
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-product-sale-credit */}
          {selected === "sale-product-credit" && (
            <>
              {/* Product */}
              <div className="mb-5">
                <SelectProduct
                  title="sell"
                  className="focus:ring-violet-500"
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
                  className="focus:ring-violet-500"
                  setLoading={setLoading}
                  value={formData.customerName}
                  name="customerName"
                  onChange={handleChange}
                />
              </div>
              {/* Sale */}
              <div className="mb-5">
                <SelectSale
                  className="focus:ring-violet-500"
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
                  className="focus:ring-violet-500"
                  value={formData.accountingInfo}
                  name="accountingInfo"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-asset-sale-credit */}
          {selected === "sale-asset-credit" && (
            <>
              {/* asset name  */}
              <div className="mb-5">
                <SelectAsset
                  className="focus:ring-violet-500"
                  value={formData.assetName}
                  name="assetName"
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* assetPrice */}
              <div className="mb-5">
                <InputBalance
                  title="Asset Price Sale :"
                  htmlFor1="asset-price"
                  name="accountingBalance"
                  placeholder="Ex : $ 10.000"
                  className="focus:ring-violet-500"
                  value={formData.accountingBalance}
                  setFormData={setFormData}
                />
              </div>
              {/* interest */}
              <div className="mb-5">
                <InputPercent1
                  title="Interest"
                  htmlForId="percent"
                  name="percent"
                  className="focus:ring-violet-500"
                  value={formData.percent}
                  setFormData={setFormData}
                />
              </div>
              {/* user */}
              <div className="mb-5">
                <SelectUser
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.userName}
                  name="userName"
                  setLoading={setLoading}
                />
              </div>
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  value={formData.accountingInfo}
                  name="accountingInfo"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-accumulation-asset */}
          {selected === "accumulated-asset" && (
            <>
              {/* asset */}
              <div className="mb-5">
                <SelectAsset
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* asset value use */}
              <div className="mb-5">
                <InputBalance
                  title="Asset Use in Value :"
                  htmlFor1="asset-value-use"
                  className="focus:ring-violet-500"
                  placeholder="Ex : $ 10.000"
                  name="accountingBalance"
                  value={formData.accountingBalance}
                  setFormData={setFormData}
                />
              </div>
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  value={formData.accountingInfo}
                  name="accountingInfo"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-withdrawl-investment-asset*/}
          {selected === "withdrawl-asset-investor" && (
            <>
              {/* asset */}
              <div className="mb-5">
                <SelectAsset
                  className="focus:ring-violet-500"
                  setLoading={setLoading}
                  value={formData.assetName}
                  name="assetName"
                  onChange={handleChange}
                />
              </div>
              {/* investor */}
              <div className="mb-5">
                <SelectInvestor
                  value={formData.investorName}
                  name="investorName"
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  value={formData.accountingInfo}
                  name="accountingInfo"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-return-product-buy-credit */}
          {selected === "return-purchase-product-credit" && (
            <>
              {/* product-name */}
              <div className="mb-5">
                <SelectProduct
                  title="buy"
                  className="focus:ring-violet-500"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* order sum */}
              {formData.productId !== "" && (
                <OrderSum
                  title="buy"
                  setFormData={setFormData}
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {/* information */}
              <div className="mb-5">
                <TextArea
                  title="More Information"
                  htmlFor1="accounting-info"
                  className="focus:ring-violet-500"
                  onChange={handleChange}
                  value={formData.accountingInfo}
                  name="accountingInfo"
                />
              </div>
            </>
          )}
          {/* api/accounting/etc-return-product-sale-credit */}
          {selected === "return-sale-product-credit" && (
            <>
              {/* Product */}
              <div className="mb-5">
                <SelectProduct
                  title="sell"
                  className="focus:ring-violet-500"
                  value={formData.productId}
                  name="productId"
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* orderSum */}
              {formData.productId !== "" && (
                <OrderSum
                  title="sell"
                  className="focus:ring-violet-500"
                  setFormData={setFormData}
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {/* Customer */}
              <div className="mb-5">
                <SelectCustomer
                  className="focus:ring-violet-500"
                  value={formData.customerName}
                  name="customerName"
                  onChange={handleChange}
                  setLoading={setLoading}
                />
              </div>
              {/* Sale */}
              <div className="mb-5">
                <SelectSale
                  className="focus:ring-violet-500"
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
                  className="focus:ring-violet-500"
                  value={formData.accountingInfo}
                  name="accountingInfo"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Cancel"
            type="button"
            className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
            onClick={() => setOpenEtc(false)}
          />
          <Button
            title={loading ? "wait..." : "Done"}
            type="submit"
            className={`bg-[#612bde] hover:bg-[#5526c3] focus:ring-[#5526c3] ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateAccounting2;
