import db from "../../database/config.js";
import {
  validateEmail,
  validateLoadImg,
  validatePosition,
  validateSamePassword,
  validateUserFullname,
} from "../../utils/validation.js";
import {
  queryDeleteUser,
  queryGet,
  queryGetCustomer,
  queryGetSales,
  queryGetTotal,
  queryRegister,
  queryUpdate,
} from "./querysql.js";

export const register = async (req) => {
  try {
    // payload
    const {
      UserEmailVal,
      UserFullnameVal,
      UserPasswordVal,
      UserPassword1Val,
      UserImgVal,
      UserPositionVal,
    } = req;
    // 1.validation email
    validateEmail(UserEmailVal);
    // 2.validation name
    validateUserFullname(UserFullnameVal);
    // 3.validation password
    if (UserPositionVal === "admin" || UserPositionVal === "sales") {
      validateSamePassword(UserPasswordVal, UserPassword1Val);
    }
    // 4.validation image & load image
    const imgBase64 = await validateLoadImg(UserImgVal);
    // 5. validation position
    validatePosition(UserPositionVal);
    // execute || done
    const query = queryRegister(
      UserEmailVal,
      UserFullnameVal.trim(),
      UserPasswordVal,
      imgBase64,
      UserPositionVal
    );
    return new Promise((resolve, reject) => {
      db.run(query, (err) => {
        if (!err) {
          const msg = `${UserFullnameVal} has been registered!`;
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
  const startOffsetVal = (offsetVal - 1) * limitVal;
  const query = queryGet(searchVal, limitVal, startOffsetVal);
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
export const getUserCustomer = () => {
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
export const getUserSale = () => {
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
export const updateUser = async (req) => {
  const {
    UserEmailVal,
    UserFullnameVal,
    UserPositionVal,
    UserIdVal,
    UserImgVal,
    CancelImg,
  } = req;
  // 1.validation email
  validateEmail(UserEmailVal);
  // 2.validation name
  validateUserFullname(UserFullnameVal);
  // 4.validation image & load image
  const imgBase64 = await validateLoadImg(UserImgVal);
  // 5. validation position
  validatePosition(UserPositionVal);
  // execute
  const query = queryUpdate(
    UserEmailVal,
    UserFullnameVal.trim(),
    UserPositionVal,
    UserIdVal,
    imgBase64,
    CancelImg
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const message = `${UserFullnameVal} has been updated`;
        resolve(message);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const deleteUserId = (req) => {
  const { userFullname, userId } = req;
  const query = queryDeleteUser(userId);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const message = `${userFullname} has been deleted `;
        resolve(message);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
