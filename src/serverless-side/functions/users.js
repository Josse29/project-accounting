import db from "../database/config.js";
import {
  queryGetCustomer,
  queryGetSales,
  queryGetUserAll,
  queryRegister,
} from "../querysql/users.js";

export const register = (req, res) => {
  const { email, fullname, password, confirmPassword, position } = req;
  if (position === "admin" || position === "sales") {
    if (password !== confirmPassword) {
      return res(false, "password must be same with confirm password");
    }
  }
  const query = queryRegister(email, fullname, password, position);
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil register");
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const getUsers = (callback) => {
  const query = queryGetUserAll();
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
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
