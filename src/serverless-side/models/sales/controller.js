import db from "../../database/config.js";
import { validateDate } from "../../utils/validation.js";
import { createAccounting } from "../accounting/controller.js";
import { createCash } from "../cash/controller.js";
import { createPersediaan1 } from "../persediaan/controller.js";
import {
  queryCreateSales,
  queryDeleteAll,
  queryDeleteSales,
  queryGetGroupCustomer,
  queryGetGroupPerson,
  queryGetReportSales,
  queryGetSales,
  queryGetSalesCustomerId,
  queryGetSalesCustomerIdDate,
  queryGetSalesDate,
  queryGetSalesDateProductId,
  queryGetSalesPersonId,
  queryGetSalesPersonIdDate,
  queryGetSalesProductId,
  queryGetSalesRowPage,
  queryGetSalesSum,
  queryGetSalesSum1,
  queryGetSalesSumCustomerId,
  queryGetSalesSumCustomerIdDate,
  queryGetSalesSumDate,
  queryGetSalesSumDateProductId,
  queryGetSalesSumPersonId,
  queryGetSalesSumPersonIdDate,
  queryGetSalesSumProductId,
  queryUpdateSales,
  queyrGetGroupProduct,
} from "./querysql.js";
// create
export const createSale = async (req) => {
  const {
    formattedDDMY,
    formattedHMS,
    SalesPersonId,
    SalesCustomerId,
    SalesStatusVal,
    ProductIdVal,
    ProductName,
    ProductPriceBuy,
    ProductPriceSell,
    ProductQtyVal,
  } = req;
  // 1. effect to db.stock
  const reqPersediaan = {
    PersediaanYMDVal: formattedDDMY,
    PersediaanHMSVal: formattedHMS,
    PersediaanQtyVal: parseFloat(ProductQtyVal * -1),
    PersediaanTotalVal: parseFloat(ProductQtyVal * ProductPriceBuy * -1),
    PersediaanInfoVal: `${ProductName} has been sold with qty ${parseFloat(
      ProductQtyVal
    )}`,
    PersediaanProductIdVal: parseInt(ProductIdVal),
    PersediaanPersonIdVal: parseInt(SalesPersonId),
  };
  await createPersediaan1(reqPersediaan);
  // 2.effect to db.cash
  const reqCash = {
    CashYYYYMMDDVal: formattedDDMY,
    CashHMSVal: formattedHMS,
    CashNameVal: `Sales Product - ${ProductName}`,
    CashRpVal: parseFloat(ProductPriceSell * ProductQtyVal),
    CashInfoVal: `${ProductName} has been sold with qty ${parseFloat(
      ProductQtyVal
    )}`,
  };
  await createCash(reqCash);
  // 3.effect to db.acounting credit and debt
  const debtEntry = {
    accountingYMDVal: formattedDDMY,
    accountingHMSVal: formattedHMS,
    accountingRefVal: 111,
    accountingNameVal: "Cash",
    accountingDebtVal: parseFloat(ProductPriceSell * ProductQtyVal),
    accountingCreditVal: 0,
    accountingInfoVal: `${ProductName} has been sold with qty ${parseFloat(
      ProductQtyVal
    )}`,
  };
  await createAccounting(debtEntry);
  const creditEntry = {
    accountingYMDVal: formattedDDMY,
    accountingHMSVal: formattedHMS,
    accountingRefVal: 411,
    accountingNameVal: "Sales",
    accountingDebtVal: 0,
    accountingCreditVal: parseFloat(ProductPriceSell * ProductQtyVal),
    accountingInfoVal: `${ProductName} has been sold with qty ${parseFloat(
      ProductQtyVal
    )}`,
  };
  await createAccounting(creditEntry);
  // execute db.sales
  const query = queryCreateSales(
    formattedDDMY,
    formattedHMS,
    ProductIdVal,
    ProductQtyVal,
    parseFloat(ProductPriceSell * ProductQtyVal),
    parseInt(SalesPersonId),
    parseInt(SalesCustomerId),
    SalesStatusVal
  );
  const msg = "Sales Has been Added";
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// read
export const getSale = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryGetSales(searchVal, limitVal, startOffsetVal);
  const sales = await window.electronAPI.sqliteApi.all(query);
  return sales;
};
export const getSaleRowPage = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetSalesRowPage(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export const getSaleReport = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryGetReportSales(startDateVal, endDateVal);
  const saleReport = await window.electronAPI.sqliteApi.all(query);
  return saleReport;
};
export const getSaleSum = async () => {
  const query = queryGetSalesSum();
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.Total_Rp ? sumRp.Total_Rp : 0;
  return resSumRp;
};
export const getSaleGroupPerson = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetGroupPerson(startDateVal, endDateVal);
  const sales = window.electronAPI.sqliteApi.all(query);
  return sales;
};
export const getSaleGroupCustomer = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetGroupCustomer(startDateVal, endDateVal);
  const sales = window.electronAPI.sqliteApi.all(query);
  return sales;
};
export const getSaleGroupProduct = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queyrGetGroupProduct(startDateVal, endDateVal);
  const sales = window.electronAPI.sqliteApi.all(query);
  return sales;
};
// product
export const getSaleSumProductId = async (req) => {
  const query = queryGetSalesSumProductId(req);
  const sumQty = await window.electronAPI.sqliteApi.each1(query);
  const resSumQty = sumQty.Total_Qty ? sumQty.Total_Qty : 0;
  return resSumQty;
};
export const getSaleProductId = async (req) => {
  const query = queryGetSalesProductId(req);
  const saleProductId = await window.electronAPI.sqliteApi.all(query);
  return saleProductId;
};
// person
export const getSalePersonId = async (req) => {
  const query = queryGetSalesPersonId(req);
  const saleProductId = await window.electronAPI.sqliteApi.all(query);
  return saleProductId;
};
export const getSaleSumPersonId = async (req) => {
  const query = queryGetSalesSumPersonId(req);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.Total_Rp ? sumRp.Total_Rp : 0;
  return resSumRp;
};
// customer
export const getSaleCustomerId = async (req) => {
  const query = queryGetSalesCustomerId(req);
  const saleCustomerId = await window.electronAPI.sqliteApi.all(query);
  return saleCustomerId;
};
export const getSaleSumCustomerId = async (req) => {
  const query = queryGetSalesSumCustomerId(req);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.Total_Rp ? sumRp.Total_Rp : 0;
  return resSumRp;
};
// date
export const getSaleDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryGetSalesDate(startDateVal, endDateVal);
  const salesByDate = await window.electronAPI.sqliteApi.all(query);
  return salesByDate;
};
export const getSaleSumDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesSumDate(startDateVal, endDateVal);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.Total_Rp ? sumRp.Total_Rp : 0;
  return resSumRp;
};
export const getSaleDateProductId = async (req) => {
  const { startDateVal, endDateVal, selectedProductId } = req;
  const query = queryGetSalesDateProductId(
    startDateVal,
    endDateVal,
    selectedProductId
  );
  const salesByDateProduct = await window.electronAPI.sqliteApi.all(query);
  return salesByDateProduct;
};
export const getSaleSumDateProductId = async (req) => {
  const { startDateVal, endDateVal, selectedProductId } = req;
  const query = queryGetSalesSumDateProductId(
    startDateVal,
    endDateVal,
    selectedProductId
  );
  const qty = await window.electronAPI.sqliteApi.each1(query);
  const resQty = qty.Total_Qty ? qty.Total_Qty : 0;
  return resQty;
};
export const getSalePersonIdDate = async (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesPersonIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  const salesByDatePerson = await window.electronAPI.sqliteApi.all(query);
  return salesByDatePerson;
};
export const getSaleSumPersonIdDate = async (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesSumPersonIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  const price = await window.electronAPI.sqliteApi.each1(query);
  const resPrice = price.Total_Rp ? price.Total_Rp : 0;
  return resPrice;
};
export const getSaleCustomerIdDate = async (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesCustomerIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  const salesByDateCustomer = await window.electronAPI.sqliteApi.all(query);
  return salesByDateCustomer;
};
export const getSaleSumCustomerIdDate = async (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesSumCustomerIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  const price = await window.electronAPI.sqliteApi.each1(query);
  const resPrice = price.Total_Rp ? price.Total_Rp : 0;
  return resPrice;
};
export const getSaleSumPriceQtyDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesSum1(startDateVal, endDateVal);
  const res = await window.electronAPI.sqliteApi.each1(query);
  const totalQty = res.Total_Qty ? res.Total_Qty : 0;
  const totalRp = res.Total_Rp ? res.Total_Rp : 0;
  return { totalQty, totalRp };
};
// update
export const updateSales = (req, res) => {
  const query = queryUpdateSales(req);
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil update");
    }
    if (err) {
      return res(false, err);
    }
  });
};
// delete
export const deleteSale = (req, res) => {
  const query = queryDeleteSales(req);
  db.run(query, (err) => {
    if (!err) {
      return res(true);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const deleteSaleAll = () => {
  const query = queryDeleteAll();
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `All of Data Sales Has been Deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
