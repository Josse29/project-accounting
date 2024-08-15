export const createTableUser = () => {
  return `CREATE TABLE User (
            UserId INTEGER primary key autoincrement,
            UserEmail VARCHAR(255) not null unique,
            UserFullname VARCHAR(255),
            UserPassword VARCHAR(255),
            UserImg BLOB,
            UserPosition VARCHAR(255)
            )`;
};
export const queryRegister = (
  emailVal,
  fullnameVal,
  passwordVal,
  positionVal
) => {
  let query = `INSERT 
               INTO User 
               (UserEmail, UserFullname, UserPassword, UserPosition) 
               VALUES 
               ('${emailVal}', '${fullnameVal}', '${passwordVal}','${positionVal}') `;
  return query;
};
export const queryGetUserAll = () => {
  let query = `SELECT * FROM User`;
  return query;
};
// for customer
export const queryGetCustomer = () => {
  let query = `SELECT 
               UserId,
               UserFullname
               FROM User `;
  //  ONlY CUSTOMER
  query += `WHERE UserPosition = 'customer' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
// for sales
export const queryGetSales = () => {
  let query = `SELECT 
               UserId,
               UserFullname
               FROM User `;
  //  ONlY sales
  query += `WHERE UserPosition = 'sales' `;
  // sort by fullname ascending
  query += `ORDER BY UserFullname ASC`;
  return query;
};
