const queryRegister = `
INSERT 
INTO User
(UserName, UserEmail, UserFullname, UserPassword, UserImg, UserPosition, UserInfo) 
VALUES 
(?, ?, ?, ?, ?, ?, ?)  
`;
const queryRegister1 = `
INSERT 
INTO User
(UserEmail, UserFullname, UserImg, UserPosition, UserInfo) 
VALUES 
(?, ?, ?, ?, ?)  
`;
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
  let query = `
  SELECT
  UserId,
  UserEmail,
  UserFullname,
  UserImg,
  UserPosition,
  UserInfo
  FROM 
  User   
  `;
  //  with search value
  if (searchVal !== "") {
    query += `
    WHERE User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR 
          User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR  
          User.UserPosition LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  //  with limit, offset, order
  query += `
  ORDER BY User.UserFullname ASC
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
               UserFullname,
               UserEmail
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
const queryUpdate = `
UPDATE 
User
SET UserName = ?,
    UserEmail = ?, 
    UserFullname = ?, 
    UserImg = ?, 
    UserPosition = ?,
    UserInfo = ?
WHERE UserId = ? 
`;
const queryUpdate1 = `
UPDATE 
User
SET UserEmail = ?, 
    UserFullname = ?, 
    UserImg = ?, 
    UserPosition = ?,
    UserInfo = ?
WHERE UserId = ? 
`;
const queryDeleteUser = `
DELETE FROM User 
WHERE UserId = ?
`;
export {
  queryDeleteUser,
  queryGet,
  queryGetCreditor,
  queryGetCustomer,
  queryGetInvestor,
  queryGetUser,
  queryGetSale,
  queryGetSupplier,
  queryGetTotal,
  queryRegister,
  queryRegister1,
  queryUpdate,
  queryUpdate1,
};
