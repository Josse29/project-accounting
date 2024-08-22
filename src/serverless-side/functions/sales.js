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
export const createSales = (req, res) => {
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
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil ");
    }
    if (err) {
      return res(false, "gagal");
    }
  });
};
// read
export const getSalesRowPage = (req, res) => {
  const { searchVal, limitVal, offsetVal } = req;
  const query = queryGetSalesRowPage(searchVal);
  db.each(query, (err, result) => {
    if (!err) {
      const limitINT = parseInt(limitVal);
      const totalSales = parseInt(result.TOTAL_ROW);
      let totalPage = ``;
      if (totalSales % limitINT === 0) {
        totalPage = parseInt(totalSales / limitINT);
      }
      if (totalSales % limitINT !== 0) {
        totalPage = parseInt(totalSales / limitINT) + 1;
      }
      return res(true, { totalPage, totalSales });
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const readSales = (req, res) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryGetSales(searchVal, limitVal, startOffsetVal);
  db.all(query, (error, response) => {
    if (!error) {
      return res(true, response);
    }
    if (error) {
      return res(false, error);
    }
  });
};
export const getReportSales = (res) => {
  const query = queryGetReportSales();
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesSum = (res) => {
  const query = queryGetSalesSum();
  db.each(query, (err, result) => {
    if (!err) {
      const sum = parseInt(result.Total_Rp);
      return res(true, sum);
    }
    if (err) {
      return res(false, err);
    }
  });
};
// product
export const getSalesSumProductId = (req, res) => {
  const query = queryGetSalesSumProductId(req);
  db.each(query, (err, rows) => {
    if (!err) {
      const result1 = rows.Total_Rp ? rows.Total_Rp : 0;
      const rupiah = parseInt(result1);
      const result2 = rows.Total_Qty ? rows.Total_Qty : 0;
      const qty = parseInt(result2);
      return res(true, { rupiah, qty });
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesProductId = (req, res) => {
  const query = queryGetSalesProductId(req);
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
// person
export const getSalesPersonId = (req, res) => {
  const query = queryGetSalesPersonId(req);
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesSumPersonId = (req, res) => {
  const query = queryGetSalesSumPersonId(req);
  db.each(query, (err, result) => {
    if (!err) {
      const total = result.Total_Rp ? parseInt(result.Total_Rp) : 0;
      return res(true, total);
    }
    if (err) {
      return res(false, err);
    }
  });
};
// customer
export const getSalesCustomerId = (req, res) => {
  const query = queryGetSalesCustomerId(req);
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, rows);
    }
  });
};
export const getSalesSumCustomerId = (req, res) => {
  const query = queryGetSalesSumCustomerId(req);
  db.each(query, (err, result) => {
    if (!err) {
      const total = result.Total_Rp ? parseInt(result.Total_Rp) : 0;
      return res(true, total);
    }
    if (err) {
      console.log(err);
    }
  });
};
// date
export const getSalesDate = (req, res) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesDate(startDateVal, endDateVal);
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesSumDate = (req, res) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetSalesSumDate(startDateVal, endDateVal);
  db.each(query, (err, result) => {
    if (!err) {
      const rupiah = result.Total_Rp ? result.Total_Rp : 0;
      return res(true, parseInt(rupiah));
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesDateProductId = (req, res) => {
  const { startDateVal, endDateVal, selectedProductId } = req;
  const query = queryGetSalesDateProductId(
    startDateVal,
    endDateVal,
    selectedProductId
  );
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesSumDateProductId = (req, res) => {
  const { startDateVal, endDateVal, selectedProductId } = req;
  const query = queryGetSalesSumDateProductId(
    startDateVal,
    endDateVal,
    selectedProductId
  );
  db.each(query, (err, result) => {
    if (!err) {
      const rupiah = result.Total_Rp ? result.Total_Rp : 0;
      const qty = result.Total_Qty ? result.Total_Qty : 0;
      return res(true, { rupiah: parseInt(rupiah), qty: parseInt(qty) });
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesPersonIdDate = (req, res) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesPersonIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesSumPersonIdDate = (req, res) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesSumPersonIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  db.each(query, (err, result) => {
    if (!err) {
      const total = result.Total_Rp ? parseInt(result.Total_Rp) : 0;
      return res(true, total);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesCustomerIdDate = (req, res) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesCustomerIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getSalesSumCustomerIdDate = (req, res) => {
  const { startDateVal, endDateVal, selectedPersonId } = req;
  const query = queryGetSalesSumCustomerIdDate(
    startDateVal,
    endDateVal,
    selectedPersonId
  );
  db.each(query, (err, result) => {
    if (!err) {
      const total = result.Total_Rp ? parseInt(result.Total_Rp) : 0;
      return res(true, total);
    }
    if (err) {
      return res(false, err);
    }
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
