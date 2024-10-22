export const queryRegister = (
  UserEmailVal,
  UserFullnameVal,
  UserPasswordVal,
  imgBase64,
  UserPositionVal
) => {
  let query = `INSERT 
               INTO User
               (UserEmail, UserFullname, UserPassword, UserImg, UserPosition) 
               VALUES 
               ('${UserEmailVal}', '${UserFullnameVal}', '${UserPasswordVal}', '${imgBase64}', '${UserPositionVal}') `;
  return query;
};
export const queryGetTotal = (searchVal) => {
  let query = `SELECT COUNT(*) AS Total_Row FROM User `;
  if (searchVal !== "") {
    query += `WHERE User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR 
                    User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR  
                    User.UserPosition LIKE '%${searchVal}%' ESCAPE '!'`;
  }
  return query;
};
export const queryGet = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT
               User.UserId, 
               User.UserFullname,
               User.UserEmail,
               User.UserImg,
               User.UserPosition
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
export const queryUpdate = (
  UserEmailVal,
  UserFullnameVal,
  UserPositionVal,
  UserIdVal,
  UserImgVal,
  imgBase64,
  CancelImg
) => {
  let query = `UPDATE 
               User 
               SET UserEmail = '${UserEmailVal}',
                   UserFullname = '${UserFullnameVal}',
                   UserPosition = '${UserPositionVal}' `;
  if (!CancelImg && UserImgVal.length >= 1) {
    query += `UserImg = '${imgBase64}', `;
  }
  if (CancelImg) {
    query += `UserImg = 'null', `;
  }
  query += `WHERE UserId = ${UserIdVal} `;
  return query;
};
export const queryDeleteUser = (userId) => {
  let query = `DELETE FROM User
               WHERE User.UserId = ${userId} `;
  return query;
};
