const queryRegister = (
  UserEmailVal,
  UserFullnameVal,
  UserPasswordVal,
  imgBase64,
  UserPositionVal,
  UserInfoVal
) => {
  let query = `INSERT 
               INTO User
               (UserEmail, UserFullname, UserPassword, UserImg, UserPosition, UserInfo) 
               VALUES 
               ('${UserEmailVal}', '${UserFullnameVal}', '${UserPasswordVal}', '${imgBase64}', '${UserPositionVal}', '${UserInfoVal}') `;
  return query;
};
const queryGetTotal = (searchVal) => {
  let query = `SELECT 
               COUNT(*) AS TOTAL_ROW 
               FROM User `;
  if (searchVal !== "") {
    query += `WHERE User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR 
                    User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR  
                    User.UserPosition LIKE '%${searchVal}%' ESCAPE '!'`;
  }
  return query;
};
const queryGet = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT
               UserId,
               UserEmail,
               UserFullname,
               UserImg,
               UserPosition,
               UserInfo
               FROM User `;
  //  with search value
  if (searchVal !== "") {
    query += `WHERE User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR 
                    User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR  
                    User.UserPosition LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  //  with limit, offset, order
  query += `ORDER BY User.UserFullname ASC
            LIMIT ${limitVal} 
            OFFSET ${offsetVal}`;
  return query;
};
const queryGetCreditor = () => {
  let query = `
  SELECT 
  UserId,
  UserFullname,
  UserEmail
  FROM User `;
  //  ONlY Creditor
  query += `WHERE UserPosition = 'creditor' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryGetDebt = () => {
  let query = `
  SELECT 
  UserId,
  UserFullname,
  UserEmail
  FROM User `;
  //  ONlY Creditor
  query += `WHERE UserPosition = 'creditor' OR `;
  query += `UserPosition = 'supplier' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryGetCustomer = () => {
  let query = `
  SELECT 
  UserId, 
  UserFullname,
  UserEmail 
  FROM User
  `;
  //  ONlY CUSTOMER
  query += `WHERE UserPosition = 'customer' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryGetUser = () => {
  let query = `
  SELECT 
  UserId, 
  UserFullname,
  UserEmail 
  FROM User
  `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryGetSale = () => {
  let query = `SELECT 
               UserId,
               UserFullname
               FROM User `;
  //  ONlY sales
  query += `WHERE UserPosition = 'sale' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryGetInvestor = () => {
  let query = `SELECT 
               UserId,
               UserEmail,
               UserFullname
               FROM User `;
  //  ONlY sales
  query += `WHERE UserPosition = 'investor' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryGetSupplier = () => {
  let query = `SELECT 
               UserId,
               UserFullname,
               UserEmail
               FROM User `;
  //  ONlY sales
  query += `WHERE UserPosition = 'supplier' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
const queryUpdate = (
  UserEmailVal,
  UserFullnameVal,
  UserPositionVal,
  UserIdVal,
  imgBase64,
  CancelImg
) => {
  let query = `UPDATE 
               User 
               SET UserEmail = '${UserEmailVal}',
                   UserFullname = '${UserFullnameVal}',
                   UserPosition = '${UserPositionVal}' `;
  if (!CancelImg && imgBase64 !== "null") {
    query += `, UserImg = '${imgBase64}' `;
  }
  if (CancelImg) {
    query += `, UserImg = 'null' `;
  }
  query += `WHERE UserId = ${UserIdVal} `;
  return query;
};
const queryDeleteUser = (userId) => {
  let query = `DELETE FROM User
               WHERE User.UserId = ${userId} `;
  return query;
};
export {
  queryDeleteUser,
  queryGet,
  queryGetDebt,
  queryGetCreditor,
  queryGetCustomer,
  queryGetInvestor,
  queryGetUser,
  queryGetSale,
  queryGetSupplier,
  queryGetTotal,
  queryRegister,
  queryUpdate,
};
