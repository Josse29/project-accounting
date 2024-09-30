import {
  queryCreateSales,
  queryDeleteSales,
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
  queryGetSalesSumCustomerId,
  queryGetSalesSumCustomerIdDate,
  queryGetSalesSumDate,
  queryGetSalesSumDateProductId,
  queryGetSalesSumPersonId,
  queryGetSalesSumPersonIdDate,
  queryGetSalesSumProductId,
  queryUpdateSales,
} from "../querysql/sales.js";
// create
export const createSales = (req) => {
  const {
    SalesYMDVal,
    SalesHMSVal,
    SalesProductIdVal,
    SalesProductQtyVal,
    SalesProductRpVal,
    SalesPersonIdVal,
    SalesCustomerIdVal,
    SalesStatusVal,
  } = req;
  const query = queryCreateSales(
    SalesYMDVal,
    SalesHMSVal,
    SalesProductIdVal,
    SalesProductQtyVal,
    SalesProductRpVal,
    SalesPersonIdVal,
    SalesCustomerIdVal,
    SalesStatusVal
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        resolve();
      }
      if (err) {
        reject();
      }
    });
  });
};
// read
export const getSalesRowPage = (req) => {
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
export const readSales = (req) => {
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
export const getReportSales = () => {
  const query = queryGetReportSales();
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
export const getSalesSum = () => {
  const query = queryGetSalesSum();
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        let total = 0;
        const response = result.Total_Rp;
        if (response !== null) {
          total = parseInt(response);
        } else {
          total = 0;
        }
        resolve(total);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// product
export const getSalesSumProductId = (req) => {
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
export const getSalesProductId = (req) => {
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
export const getSalesPersonId = (req) => {
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
export const getSalesSumPersonId = (req) => {
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
export const getSalesCustomerId = (req) => {
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
export const getSalesSumCustomerId = (req) => {
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
export const getSalesDate = (req) => {
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
export const getSalesSumDate = (req) => {
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
export const getSalesDateProductId = (req) => {
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
export const getSalesSumDateProductId = (req) => {
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
export const getSalesPersonIdDate = (req) => {
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
export const getSalesSumPersonIdDate = (req) => {
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
export const getSalesCustomerIdDate = (req) => {
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
export const getSalesSumCustomerIdDate = (req) => {
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
