import {
  queryCreateSales,
  queryDeleteSales,
  queryGetSales,
  queryUpdateSales,
} from "../querysql/sales.js";
// create
export const createSales = (req, res) => {
  const {
    ymdVal,
    hmsVal,
    productIdVal,
    productQtyVal,
    productTotalVal,
    personIdVal,
    customerIdVal,
  } = req;
  const query = queryCreateSales(
    ymdVal,
    hmsVal,
    productIdVal,
    productQtyVal,
    productTotalVal,
    personIdVal,
    customerIdVal
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
export const readSales = (res) => {
  const query = queryGetSales();
  db.all(query, (error, response) => {
    if (!err) {
      return res(true, response);
    }
    if (err) {
      return res(false, error);
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
