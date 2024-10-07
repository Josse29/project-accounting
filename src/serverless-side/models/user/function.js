import { validateEmail } from "../../utils/regex.js";
import {
  getImageBase64,
  validateImg,
  validateSamePassword,
  validateUserFullname,
} from "../../utils/validation.js";
import {
  queryGet,
  queryGetCustomer,
  queryGetSales,
  queryGetTotal,
  queryRegister,
} from "./querysql.js";

export const register = async (req) => {
  try {
    // payload
    const {
      UserEmailVal,
      UserFullnameVal,
      UserPasswordVal,
      UserPassword1Val,
      UserPositionVal,
      UserImgVal,
    } = req;
    // 1.validation name
    validateUserFullname(UserFullnameVal);
    // 2.validation email
    validateEmail(UserEmailVal);
    // 3.validation password
    validateSamePassword(UserPasswordVal, UserPassword1Val);
    // 4.validation image & load image
    validateImg(UserImgVal);
    const imgBase64 = await getImageBase64(UserImgVal);
    // 5.execute || done
    const query = queryRegister(
      UserEmailVal,
      UserFullnameVal,
      UserPasswordVal,
      UserPositionVal,
      imgBase64
    );
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
  } catch (error) {
    const erroMsg = error.message || error;
    throw new Error(erroMsg);
  }
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
  const query = queryGetTotal(searchVal);
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
