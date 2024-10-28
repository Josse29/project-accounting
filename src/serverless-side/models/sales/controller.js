import db from "../../database/config.js";
import { createAccounting } from "../accounting/controller.js";
import { createCash } from "../cash/controller.js";
import { createPersediaan1 } from "../persediaan/controller.js";
import {
  queryCreateSales,
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
    accountingPositionVal: "debt",
    accountingRpVal: parseFloat(ProductPriceSell * ProductQtyVal),
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
    accountingPositionVal: "credit",
    accountingRpVal: parseFloat(ProductPriceSell * ProductQtyVal),
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
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = "Sales Has been Added";
        resolve(msg);
      }
      if (err) {
        reject();
      }
    });
  });
};
// read
export const getSale = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryGetSales(searchVal, limitVal, startOffsetVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleRowPage = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetSalesRowPage(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const totalRow = parseInt(result.TOTAL_ROW);
        let totalPage = ``;
        if (totalRow % limitVal === 0) {
          totalPage = parseInt(totalRow / limitVal);
        }
        if (totalRow % limitVal !== 0) {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalRow, totalPage });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleReport = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetReportSales(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSum = () => {
  const query = queryGetSalesSum();
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const response = result.Total_Rp;
        const totalRp = response ? response : 0;
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleGroupPerson = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetGroupPerson(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleGroupCustomer = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetGroupCustomer(startDateVal, endDateVal);
  console.log(query);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleGroupProduct = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queyrGetGroupProduct(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// product
export const getSaleSumProductId = (req) => {
  const query = queryGetSalesSumProductId(req);
  return new Promise((resolve, reject) => {
    db.each(query, (err, rows) => {
      if (!err) {
        // total rp
        const result1 = rows.Total_Rp;
        const rupiah = result1 ? result1 : 0;
        // total qty
        const result2 = rows.Total_Qty;
        const qty = result2 ? result2 : 0;
        resolve({ rupiah, qty });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleProductId = (req) => {
  const query = queryGetSalesProductId(req);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// person
export const getSalePersonId = (req) => {
  const query = queryGetSalesPersonId(req);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSumPersonId = (req) => {
  const query = queryGetSalesSumPersonId(req);
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const total = result.Total_Rp ? parseInt(result.Total_Rp) : 0;
        resolve(total);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// customer
export const getSaleCustomerId = (req) => {
  const query = queryGetSalesCustomerId(req);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSumCustomerId = (req) => {
  const query = queryGetSalesSumCustomerId(req);
  return new Promise((resolve) => {
    db.each(query, (err, result) => {
      if (!err) {
        const response = result.Total_Rp;
        const total = response ? parseInt(response) : 0;
        resolve(total);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// date
export const getSaleDate = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesDate(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSumDate = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesSumDate(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const res = result.Total_Rp;
        const totalRp = res ? res : 0;
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleDateProductId = (req) => {
  const { startDateVal, endDateVal, selectedProductId } = req;
  const query = queryGetSalesDateProductId(
    startDateVal,
    endDateVal,
    selectedProductId
  );
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSumDateProductId = (req) => {
  const { startDateVal, endDateVal, selectedProductId } = req;
  const query = queryGetSalesSumDateProductId(
    startDateVal,
    endDateVal,
    selectedProductId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const rupiah = result.Total_Rp ? result.Total_Rp : 0;
        const qty = result.Total_Qty ? result.Total_Qty : 0;
        resolve({ rupiah: parseInt(rupiah), qty: parseInt(qty) });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSalePersonIdDate = (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesPersonIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSumPersonIdDate = (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesSumPersonIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const response = result.Total_Rp;
        const total = response ? response : 0;
        resolve(total);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleCustomerIdDate = (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesCustomerIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSumCustomerIdDate = (req) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesSumCustomerIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const response = result.Total_Rp;
        const total = response ? response : 0;
        resolve(total);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getSaleSummary = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesSum1(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        const response1 = res.Total_Rp ? res.Total_Rp : 0;
        const response2 = res.Total_Qty ? res.Total_Qty : 0;
        resolve({
          totalRp: response1,
          totalQty: response2,
        });
      }
      if (err) {
        reject(err);
      }
    });
  });
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
export const deleteSales = (req, res) => {
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
