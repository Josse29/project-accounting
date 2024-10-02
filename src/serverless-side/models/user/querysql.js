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
// total-row
export const queryGetTotal = () => {
  let query = `SELECT COUNT(*) AS Total_Row FROM User `;
  return query;
};
// get-all-user
export const queryGet = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT * FROM User `;
  if (searchVal !== "") {
  }
  query += `LIMI `;
  //  with search value
  if (categorySearch !== "") {
    query += `WHERE ${colCategoryName} LIKE '%${categorySearch}%' ESCAPE '!' OR 
                        ${colCategoryInfo} LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  //  with limit, offset, order
  query += `ORDER BY ${colCategoryName} ASC
                LIMIT ${categoryLimit} 
                OFFSET ${categoryStartOffset}`;
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
