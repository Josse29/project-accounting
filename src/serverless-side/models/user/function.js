import {
  queryGet,
  queryGetCustomer,
  queryGetSales,
  queryGetTotal,
  queryRegister,
} from "./querysql.js";

export const register = (req) => {
  const { email, fullname, password, confirmPassword, position } = req;
  if (position === "admin" || position === "sales") {
    if (password !== confirmPassword) {
      const msg = `password must be same with confirm password`;
      throw new Error(msg);
    }
  }
  const query = queryRegister(email, fullname, password, position);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Registered Success`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getUser = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const query = queryGet(searchVal, limitVal, offsetVal);
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
export const getUserPageRow = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetTotal();
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = res.Total_Row;
        if (totalRow % limitVal === 0) {
          totalPage = totalRow / limitVal;
        }
        if (totalRow % limitVal !== 0) {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalPage, totalRow });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// only customer
export const getCustomer = () => {
  const query = queryGetCustomer();
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
// only sales
export const getSales = () => {
  const query = queryGetSales();
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
